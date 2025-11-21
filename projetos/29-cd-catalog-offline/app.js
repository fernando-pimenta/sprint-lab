// Estado Global
let cds = [];
let editingId = null;
let currentTracklist = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadCDs();
    renderCatalog();
    updateTotalCDs();
});

// ============== BUSCA E API ==============

async function searchByArtist() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('Digite o nome de um artista');
        return;
    }

    showLoading();
    try {
        const url = `https://musicbrainz.org/ws/2/release-group/?query=artist:${encodeURIComponent(query)}&fmt=json&limit=20`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'CDCatalogOffline/1.0.0 (https://github.com/fernando-pimenta/sprint-lab)'
            }
        });

        if (!response.ok) throw new Error('Erro na busca');

        const data = await response.json();
        displaySearchResults(data['release-groups'] || []);
    } catch (error) {
        console.error('Erro ao buscar artista:', error);
        alert('Erro ao buscar. Tente novamente.');
    } finally {
        hideLoading();
    }
}

async function searchByAlbum() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('Digite o nome de um álbum');
        return;
    }

    showLoading();
    try {
        const url = `https://musicbrainz.org/ws/2/release-group/?query=releasegroup:${encodeURIComponent(query)}&fmt=json&limit=20`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'CDCatalogOffline/1.0.0 (https://github.com/fernando-pimenta/sprint-lab)'
            }
        });

        if (!response.ok) throw new Error('Erro na busca');

        const data = await response.json();
        displaySearchResults(data['release-groups'] || []);
    } catch (error) {
        console.error('Erro ao buscar álbum:', error);
        alert('Erro ao buscar. Tente novamente.');
    } finally {
        hideLoading();
    }
}

function displaySearchResults(results) {
    const container = document.getElementById('searchResults');

    if (results.length === 0) {
        container.innerHTML = '<p style="color: #7f8c8d; padding: 20px;">Nenhum resultado encontrado.</p>';
        return;
    }

    let html = '<div class="search-results-grid">';

    results.forEach(item => {
        const title = item.title || 'Sem título';
        const artist = item['artist-credit'] ? item['artist-credit'][0].name : 'Artista desconhecido';
        const year = item['first-release-date'] ? item['first-release-date'].substring(0, 4) : 'Ano desconhecido';
        const type = item['primary-type'] || 'Album';
        const mbid = item.id;

        html += `
            <div class="search-result-card">
                <img src="https://via.placeholder.com/80?text=CD" class="search-result-cover" id="cover-${mbid}" alt="Capa">
                <div class="search-result-info">
                    <h4>${title}</h4>
                    <p><strong>${artist}</strong></p>
                    <p>${year} • ${type}</p>
                    <button onclick="selectAlbum('${mbid}', '${escapeQuotes(title)}', '${escapeQuotes(artist)}', '${year}', '${type}')" class="btn btn-primary btn-small">Selecionar</button>
                </div>
            </div>
        `;

        // Buscar capa assincronamente
        fetchCover(mbid);
    });

    html += '</div>';
    container.innerHTML = html;
}

async function fetchCover(mbid) {
    try {
        const response = await fetch(`https://coverartarchive.org/release-group/${mbid}`, {
            headers: {
                'User-Agent': 'CDCatalogOffline/1.0.0 (https://github.com/fernando-pimenta/sprint-lab)'
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.images && data.images.length > 0) {
                const coverUrl = data.images[0].thumbnails?.small || data.images[0].image;
                const imgElement = document.getElementById(`cover-${mbid}`);
                if (imgElement) {
                    imgElement.src = coverUrl;
                }
            }
        }
    } catch (error) {
        // Silenciosamente ignora erros de capa
    }
}

async function selectAlbum(mbid, title, artist, year, type) {
    showLoading();

    try {
        // Buscar detalhes completos do álbum
        const releaseUrl = `https://musicbrainz.org/ws/2/release-group/${mbid}?inc=releases&fmt=json`;
        const releaseResponse = await fetch(releaseUrl, {
            headers: {
                'User-Agent': 'CDCatalogOffline/1.0.0 (https://github.com/fernando-pimenta/sprint-lab)'
            }
        });

        let releaseId = null;
        let label = '';

        if (releaseResponse.ok) {
            const releaseData = await releaseResponse.json();
            if (releaseData.releases && releaseData.releases.length > 0) {
                releaseId = releaseData.releases[0].id;

                // Buscar informações detalhadas do release
                const detailUrl = `https://musicbrainz.org/ws/2/release/${releaseId}?inc=recordings+labels+release-groups&fmt=json`;
                const detailResponse = await fetch(detailUrl, {
                    headers: {
                        'User-Agent': 'CDCatalogOffline/1.0.0 (https://github.com/fernando-pimenta/sprint-lab)'
                    }
                });

                if (detailResponse.ok) {
                    const detailData = await detailResponse.json();

                    // Gravadora
                    if (detailData['label-info'] && detailData['label-info'].length > 0) {
                        label = detailData['label-info'][0].label?.name || '';
                    }

                    // Tracklist
                    if (detailData.media && detailData.media.length > 0) {
                        currentTracklist = [];
                        detailData.media.forEach(medium => {
                            if (medium.tracks) {
                                medium.tracks.forEach(track => {
                                    currentTracklist.push({
                                        position: track.position,
                                        title: track.title,
                                        duration: formatDuration(track.length)
                                    });
                                });
                            }
                        });
                    }
                }
            }
        }

        // Buscar capa em alta resolução
        let coverUrl = 'https://via.placeholder.com/250?text=Sem+Capa';
        try {
            const coverResponse = await fetch(`https://coverartarchive.org/release-group/${mbid}`, {
                headers: {
                    'User-Agent': 'CDCatalogOffline/1.0.0 (https://github.com/fernando-pimenta/sprint-lab)'
                }
            });

            if (coverResponse.ok) {
                const coverData = await coverResponse.json();
                if (coverData.images && coverData.images.length > 0) {
                    coverUrl = coverData.images[0].image;
                }
            }
        } catch (error) {
            // Usa placeholder se não encontrar capa
        }

        // Preencher formulário
        showForm();
        document.getElementById('albumName').value = title;
        document.getElementById('artistName').value = artist;
        document.getElementById('year').value = year;
        document.getElementById('type').value = type;
        document.getElementById('label').value = label;
        document.getElementById('coverUrl').value = coverUrl;

        // Exibir capa
        const coverPreview = document.getElementById('coverPreview');
        const coverPlaceholder = document.getElementById('coverPlaceholder');
        coverPreview.src = coverUrl;
        coverPreview.classList.add('active');
        coverPlaceholder.style.display = 'none';

        // Exibir tracklist
        renderTracklist();

        // Scroll para o formulário
        document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
        alert('Erro ao carregar detalhes. Tente novamente.');
    } finally {
        hideLoading();
    }
}

function formatDuration(milliseconds) {
    if (!milliseconds) return '';
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function renderTracklist() {
    const container = document.getElementById('tracklistContainer');

    if (currentTracklist.length === 0) {
        container.innerHTML = '<p class="tracklist-empty">Nenhuma faixa adicionada</p>';
        return;
    }

    let html = '';
    currentTracklist.forEach(track => {
        html += `
            <div class="track-item">
                <span class="track-number">${track.position}.</span>
                <span class="track-title">${track.title}</span>
                <span class="track-duration">${track.duration}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============== CRUD ==============

document.getElementById('cdForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveCD();
});

function saveCD() {
    const cd = {
        id: editingId || Date.now().toString(),
        albumName: document.getElementById('albumName').value,
        artistName: document.getElementById('artistName').value,
        year: document.getElementById('year').value,
        type: document.getElementById('type').value,
        label: document.getElementById('label').value,
        genre: document.getElementById('genre').value,
        condition: document.getElementById('condition').value,
        boxCondition: document.getElementById('boxCondition').value,
        edition: document.getElementById('edition').value,
        price: document.getElementById('price').value,
        notes: document.getElementById('notes').value,
        coverUrl: document.getElementById('coverUrl').value,
        tracklist: [...currentTracklist],
        dateAdded: editingId ? cds.find(c => c.id === editingId)?.dateAdded : new Date().toISOString()
    };

    if (editingId) {
        const index = cds.findIndex(c => c.id === editingId);
        cds[index] = cd;
    } else {
        cds.push(cd);
    }

    saveCDs();
    renderCatalog();
    updateTotalCDs();
    cancelForm();

    alert(editingId ? 'CD atualizado com sucesso!' : 'CD adicionado com sucesso!');
}

function editCD(id) {
    const cd = cds.find(c => c.id === id);
    if (!cd) return;

    editingId = id;
    currentTracklist = cd.tracklist || [];

    document.getElementById('formTitle').textContent = 'Editar CD';
    document.getElementById('cdId').value = cd.id;
    document.getElementById('albumName').value = cd.albumName;
    document.getElementById('artistName').value = cd.artistName;
    document.getElementById('year').value = cd.year;
    document.getElementById('type').value = cd.type;
    document.getElementById('label').value = cd.label || '';
    document.getElementById('genre').value = cd.genre || '';
    document.getElementById('condition').value = cd.condition;
    document.getElementById('boxCondition').value = cd.boxCondition || '';
    document.getElementById('edition').value = cd.edition;
    document.getElementById('price').value = cd.price || '';
    document.getElementById('notes').value = cd.notes || '';
    document.getElementById('coverUrl').value = cd.coverUrl;

    const coverPreview = document.getElementById('coverPreview');
    const coverPlaceholder = document.getElementById('coverPlaceholder');
    coverPreview.src = cd.coverUrl;
    coverPreview.classList.add('active');
    coverPlaceholder.style.display = 'none';

    renderTracklist();
    showForm();
    document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
}

function deleteCD(id) {
    if (!confirm('Tem certeza que deseja excluir este CD?')) return;

    cds = cds.filter(c => c.id !== id);
    saveCDs();
    renderCatalog();
    updateTotalCDs();

    alert('CD excluído com sucesso!');
}

function renderCatalog() {
    const container = document.getElementById('catalogContainer');

    if (cds.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum CD cadastrado ainda. Use a busca acima para começar!</p>';
        return;
    }

    let html = '';
    cds.forEach(cd => {
        html += `
            <div class="cd-card">
                <img src="${cd.coverUrl}" alt="${cd.albumName}" class="cd-card-cover">
                <div class="cd-card-body">
                    <h3 class="cd-card-title">${cd.albumName}</h3>
                    <p class="cd-card-artist">${cd.artistName}</p>
                    <div class="cd-card-info">
                        <span>${cd.year}</span>
                        <span>${cd.type}</span>
                    </div>
                    <div class="cd-card-details">
                        <p><strong>Condição:</strong> ${cd.condition}</p>
                        ${cd.boxCondition ? `<p><strong>Caixa:</strong> ${cd.boxCondition}</p>` : ''}
                        ${cd.edition ? `<p><strong>Edição:</strong> ${cd.edition}</p>` : ''}
                        ${cd.price ? `<p><strong>Valor:</strong> R$ ${parseFloat(cd.price).toFixed(2)}</p>` : ''}
                        ${cd.label ? `<p><strong>Gravadora:</strong> ${cd.label}</p>` : ''}
                        ${cd.genre ? `<p><strong>Gênero:</strong> ${cd.genre}</p>` : ''}
                        ${cd.tracklist && cd.tracklist.length > 0 ? `<p><strong>Faixas:</strong> ${cd.tracklist.length}</p>` : ''}
                    </div>
                    <div class="cd-card-actions">
                        <button onclick="editCD('${cd.id}')" class="btn btn-edit btn-small">Editar</button>
                        <button onclick="deleteCD('${cd.id}')" class="btn btn-danger btn-small">Excluir</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============== FORMULÁRIO ==============

function showForm() {
    document.getElementById('formSection').style.display = 'block';
}

function cancelForm() {
    document.getElementById('cdForm').reset();
    document.getElementById('formTitle').textContent = 'Adicionar CD';
    document.getElementById('formSection').style.display = 'none';

    const coverPreview = document.getElementById('coverPreview');
    const coverPlaceholder = document.getElementById('coverPlaceholder');
    coverPreview.classList.remove('active');
    coverPlaceholder.style.display = 'block';

    editingId = null;
    currentTracklist = [];
    renderTracklist();
}

// ============== LOCALSTORAGE ==============

function saveCDs() {
    localStorage.setItem('cdCatalog', JSON.stringify(cds));
}

function loadCDs() {
    const stored = localStorage.getItem('cdCatalog');
    if (stored) {
        cds = JSON.parse(stored);
    }
}

function updateTotalCDs() {
    document.getElementById('totalCDs').textContent = `Total de CDs: ${cds.length}`;
}

// ============== EXPORTAR/IMPORTAR ==============

function exportCatalog() {
    if (cds.length === 0) {
        alert('Nenhum CD para exportar');
        return;
    }

    const dataStr = JSON.stringify(cds, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `cd-catalog-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
    alert('Catálogo exportado com sucesso!');
}

function importCatalog(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);

            if (!Array.isArray(imported)) {
                throw new Error('Formato inválido');
            }

            const confirm = window.confirm(
                `Deseja importar ${imported.length} CDs?\n\n` +
                `Substituir: Apaga catálogo atual\n` +
                `OK = Substituir | Cancelar = Mesclar`
            );

            if (confirm) {
                cds = imported;
            } else {
                // Mesclar, evitando duplicados por ID
                imported.forEach(newCD => {
                    if (!cds.find(cd => cd.id === newCD.id)) {
                        cds.push(newCD);
                    }
                });
            }

            saveCDs();
            renderCatalog();
            updateTotalCDs();
            alert('Catálogo importado com sucesso!');
        } catch (error) {
            alert('Erro ao importar: arquivo inválido');
        }
    };

    reader.readAsText(file);
    event.target.value = '';
}

// ============== UTILIDADES ==============

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

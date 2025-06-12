document.addEventListener('DOMContentLoaded', function() {
    // Configuração da URL da API
    const API_URL = 'http://localhost:3000/api/users';
    
    // Elementos do DOM
    const loadingSpinner = document.getElementById('loading-spinner');
    const usersTableBody = document.getElementById('users-table-body');
    const userModal = new bootstrap.Modal(document.getElementById('user-modal'));
    const userDetailsModal = new bootstrap.Modal(document.getElementById('user-details-modal'));
    const deleteConfirmationModal = new bootstrap.Modal(document.getElementById('delete-confirmation-modal'));
    const userForm = document.getElementById('user-form');
    const btnNewUser = document.getElementById('btn-new-user');
    const btnSaveUser = document.getElementById('btn-save-user');
    const btnEditUserDetails = document.getElementById('btn-edit-user-details');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete');
    const searchInput = document.getElementById('search-input');
    const btnSearch = document.getElementById('btn-search');
    
    // Estado da aplicação
    let users = [];
    let currentUserId = null;
    
    // Event Listeners
    btnNewUser.addEventListener('click', showNewUserModal);
    btnSaveUser.addEventListener('click', saveUser);
    btnEditUserDetails.addEventListener('click', showEditUserModal);
    btnConfirmDelete.addEventListener('click', deleteUser);
    btnSearch.addEventListener('click', searchUsers);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchUsers();
    });
    
    // Carregamento inicial
    loadUsers();
    
    // Funções de manipulação da API
    async function loadUsers() {
        showLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Erro ao carregar usuários');
            
            users = await response.json();
            renderUsersTable(users);
            
            showStatusMessage('Usuários carregados com sucesso', 'success');
        } catch (error) {
            console.error('Erro:', error);
            showStatusMessage('Erro ao carregar usuários: ' + error.message, 'danger');
        } finally {
            showLoading(false);
        }
    }
    
    async function saveUser() {
        // Validação do formulário
        if (!validateForm()) {
            return;
        }
        
        showLoading(true);
        
        try {
            // Coleta dos dados do formulário
            const userData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                role: document.getElementById('role').value,
                level: parseInt(document.getElementById('level').value) || 0,
                experience: parseInt(document.getElementById('experience').value) || 0,
                coins: parseInt(document.getElementById('coins').value) || 1000,
                isActive: document.getElementById('is-active').checked,
                avatarUrl: document.getElementById('avatar-url').value || null
            };
            
            // Senha (opcional para edição)
            const password = document.getElementById('password').value;
            if (password) userData.password = password;
            
            // Campos JSON
            try {
                const gameStats = document.getElementById('game-stats').value;
                if (gameStats) userData.gameStats = JSON.parse(gameStats);
                
                const achievements = document.getElementById('achievements').value;
                if (achievements) userData.achievements = JSON.parse(achievements);
                
                const inventory = document.getElementById('inventory').value;
                if (inventory) userData.inventory = JSON.parse(inventory);
            } catch (e) {
                showStatusMessage('Erro no formato JSON: ' + e.message, 'danger');
                showLoading(false);
                return;
            }
            
            let response;
            if (currentUserId) {
                // Atualização de usuário existente
                response = await fetch(`${API_URL}/${currentUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
            } else {
                // Criação de novo usuário
                response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
            }
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao salvar usuário');
            }
            
            userModal.hide();
            await loadUsers();
            
            const successMessage = currentUserId 
                ? `Usuário ${userData.username} atualizado com sucesso` 
                : `Usuário ${userData.username} criado com sucesso`;
            showStatusMessage(successMessage, 'success');
            
        } catch (error) {
            console.error('Erro:', error);
            showStatusMessage('Erro ao salvar usuário: ' + error.message, 'danger');
        } finally {
            showLoading(false);
        }
    }
    
    async function deleteUser() {
        if (!currentUserId) return;
        
        showLoading(true);
        
        try {
            const response = await fetch(`${API_URL}/${currentUserId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Erro ao excluir usuário');
            }
            
            deleteConfirmationModal.hide();
            await loadUsers();
            showStatusMessage('Usuário excluído com sucesso', 'success');
            
        } catch (error) {
            console.error('Erro:', error);
            showStatusMessage('Erro ao excluir usuário: ' + error.message, 'danger');
        } finally {
            showLoading(false);
        }
    }
    
    function searchUsers() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            renderUsersTable(users);
            return;
        }
        
        const filteredUsers = users.filter(user => 
            user.username.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            (user.role && user.role.toLowerCase().includes(searchTerm))
        );
        
        renderUsersTable(filteredUsers);
    }
    
    // Funções de manipulação da UI
    function renderUsersTable(usersData) {
        usersTableBody.innerHTML = '';
        
        if (usersData.length === 0) {
            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center py-3">Nenhum usuário encontrado</td>
                </tr>
            `;
            return;
        }
        
        usersData.forEach(user => {
            const row = document.createElement('tr');
            
            // Avatar placeholder se não houver URL
            const avatarUrl = user.avatarUrl || 'https://via.placeholder.com/64?text=' + user.username.charAt(0).toUpperCase();
            
            row.innerHTML = `
                <td>${user.id}</td>
                <td>
                    <div class="avatar-container" style="width: 40px; height: 40px;">
                        <img src="${avatarUrl}" alt="${user.username}" onerror="this.src='https://via.placeholder.com/64?text=${user.username.charAt(0).toUpperCase()}'">
                    </div>
                </td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.level}</td>
                <td>${user.experience}</td>
                <td>${user.coins}</td>
                <td>
                    <span class="badge ${user.isActive ? 'bg-success' : 'bg-danger'}">
                        ${user.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="showUserDetails(${user.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary me-1" onclick="showEditUserModal(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="showDeleteConfirmation(${user.id}, '${user.username}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            usersTableBody.appendChild(row);
        });
    }
    
    function showNewUserModal() {
        currentUserId = null;
        document.getElementById('user-modal-label').textContent = 'Novo Usuário';
        userForm.reset();
        
        // Valores padrão
        document.getElementById('level').value = '0';
        document.getElementById('experience').value = '0';
        document.getElementById('coins').value = '1000';
        document.getElementById('is-active').checked = true;
        document.getElementById('role').value = 'user';
        document.getElementById('game-stats').value = '{"victories": 0, "defeats": 0, "timePlayed": 0}';
        document.getElementById('achievements').value = '[]';
        document.getElementById('inventory').value = '[]';
        
        // Exibir o campo de senha como obrigatório para novo usuário
        document.getElementById('password').required = true;
        document.getElementById('password-help').style.display = 'none';
        
        userModal.show();
    }
    
    async function showEditUserModal(userId = null) {
        // Se chamado do modal de detalhes, usar o ID atual
        if (!userId) userId = currentUserId;
        if (!userId) return;
        
        currentUserId = userId;
        userDetailsModal.hide(); // Fechar modal de detalhes se estiver aberto
        
        showLoading(true);
        
        try {
            const response = await fetch(`${API_URL}/${userId}`);
            if (!response.ok) throw new Error('Erro ao carregar dados do usuário');
            
            const user = await response.json();
            
            document.getElementById('user-modal-label').textContent = `Editar Usuário: ${user.username}`;
            document.getElementById('username').value = user.username;
            document.getElementById('email').value = user.email;
            document.getElementById('role').value = user.role || 'user';
            document.getElementById('level').value = user.level;
            document.getElementById('experience').value = user.experience;
            document.getElementById('coins').value = user.coins;
            document.getElementById('is-active').checked = user.isActive;
            document.getElementById('avatar-url').value = user.avatarUrl || '';
            
            // Campos JSON
            document.getElementById('game-stats').value = user.gameStats ? JSON.stringify(user.gameStats, null, 2) : '{}';
            document.getElementById('achievements').value = user.achievements ? JSON.stringify(user.achievements, null, 2) : '[]';
            document.getElementById('inventory').value = user.inventory ? JSON.stringify(user.inventory, null, 2) : '[]';
            
            // Senha não é obrigatória na edição
            document.getElementById('password').required = false;
            document.getElementById('password').value = '';
            document.getElementById('password-help').style.display = 'block';
            
            userModal.show();
            
        } catch (error) {
            console.error('Erro:', error);
            showStatusMessage('Erro ao carregar dados do usuário: ' + error.message, 'danger');
        } finally {
            showLoading(false);
        }
    }
    
    async function showUserDetails(userId) {
        if (!userId) return;
        currentUserId = userId;
        
        showLoading(true);
        
        try {
            const response = await fetch(`${API_URL}/${userId}`);
            if (!response.ok) throw new Error('Erro ao carregar dados do usuário');
            
            const user = await response.json();
            
            // Detalhes básicos
            document.getElementById('detail-id').textContent = user.id;
            document.getElementById('detail-username').textContent = user.username;
            document.getElementById('detail-email').textContent = user.email;
            document.getElementById('detail-role').textContent = user.role || 'user';
            document.getElementById('detail-created-at').textContent = new Date(user.createdAt).toLocaleString();
            document.getElementById('detail-updated-at').textContent = new Date(user.updatedAt).toLocaleString();
            
            // Avatar
            const avatarUrl = user.avatarUrl || 'https://via.placeholder.com/150?text=' + user.username.charAt(0).toUpperCase();
            document.getElementById('detail-avatar').src = avatarUrl;
            
            // Status
            if (user.isActive) {
                document.getElementById('detail-active-badge').classList.remove('d-none');
                document.getElementById('detail-inactive-badge').classList.add('d-none');
            } else {
                document.getElementById('detail-active-badge').classList.add('d-none');
                document.getElementById('detail-inactive-badge').classList.remove('d-none');
            }
            
            // Progresso
            document.getElementById('detail-level').textContent = user.level;
            document.getElementById('detail-experience').textContent = user.experience;
            document.getElementById('detail-coins').textContent = user.coins;
            
            // Estatísticas do jogo
            const gameStatsEl = document.getElementById('detail-game-stats');
            gameStatsEl.innerHTML = '';
            
            if (user.gameStats && Object.keys(user.gameStats).length > 0) {
                const statsList = document.createElement('dl');
                statsList.className = 'row mb-0';
                
                for (const [key, value] of Object.entries(user.gameStats)) {
                    const formattedKey = key.replace(/([A-Z])/g, ' $1')
                                           .replace(/^./, str => str.toUpperCase());
                    
                    statsList.innerHTML += `
                        <dt class="col-sm-4">${formattedKey}:</dt>
                        <dd class="col-sm-8">${value}</dd>
                    `;
                }
                
                gameStatsEl.appendChild(statsList);
            } else {
                gameStatsEl.innerHTML = '<p class="text-muted mb-0">Nenhuma estatística disponível</p>';
            }
            
            // Conquistas
            const achievementsEl = document.getElementById('detail-achievements');
            achievementsEl.innerHTML = '';
            
            if (user.achievements && user.achievements.length > 0) {
                user.achievements.forEach(achievement => {
                    const achievementEl = document.createElement('div');
                    achievementEl.className = 'achievement-badge mb-2';
                    
                    if (achievement.unlocked === false) {
                        achievementEl.classList.add('bg-secondary');
                    }
                    
                    achievementEl.innerHTML = `
                        <div class="d-flex align-items-center">
                            <i class="fas ${achievement.unlocked !== false ? 'fa-trophy' : 'fa-lock'} me-2"></i>
                            <div>
                                <strong>${achievement.name}</strong>
                                ${achievement.description ? `<div><small>${achievement.description}</small></div>` : ''}
                            </div>
                        </div>
                    `;
                    
                    achievementsEl.appendChild(achievementEl);
                });
            } else {
                achievementsEl.innerHTML = '<p class="text-muted">Nenhuma conquista disponível</p>';
            }
            
            // Inventário
            const inventoryEl = document.getElementById('detail-inventory');
            inventoryEl.innerHTML = '';
            
            if (user.inventory && user.inventory.length > 0) {
                user.inventory.forEach(item => {
                    const itemEl = document.createElement('div');
                    itemEl.className = 'inventory-item mb-2';
                    
                    // Determinar ícone com base no tipo
                    let icon = 'box';
                    if (item.type) {
                        switch(item.type.toLowerCase()) {
                            case 'weapon': icon = 'sword'; break;
                            case 'armor': icon = 'shield-alt'; break;
                            case 'potion': icon = 'flask'; break;
                            case 'special': icon = 'gem'; break;
                            case 'bundle': icon = 'cube'; break;
                        }
                    }
                    
                    itemEl.innerHTML = `
                        <div class="d-flex align-items-center">
                            <i class="fas fa-${icon} me-2"></i>
                            <div>
                                <strong>${item.name}</strong>
                                ${item.type ? `<div><small>Tipo: ${item.type}</small></div>` : ''}
                                ${item.power ? `<div><small>Poder: ${item.power}</small></div>` : ''}
                            </div>
                        </div>
                    `;
                    
                    inventoryEl.appendChild(itemEl);
                });
            } else {
                inventoryEl.innerHTML = '<p class="text-muted">Nenhum item no inventário</p>';
            }
            
            userDetailsModal.show();
            
        } catch (error) {
            console.error('Erro:', error);
            showStatusMessage('Erro ao carregar detalhes do usuário: ' + error.message, 'danger');
        } finally {
            showLoading(false);
        }
    }
    
    function showDeleteConfirmation(userId, username) {
        if (!userId) return;
        
        currentUserId = userId;
        document.getElementById('delete-user-name').textContent = username;
        deleteConfirmationModal.show();
    }
    
    function validateForm() {
        // Validação básica
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        if (!username) {
            showStatusMessage('Nome de usuário é obrigatório', 'danger');
            return false;
        }
        
        if (!email) {
            showStatusMessage('Email é obrigatório', 'danger');
            return false;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatusMessage('Formato de email inválido', 'danger');
            return false;
        }
        
        // Senha obrigatória para novos usuários
        if (!currentUserId && !password) {
            showStatusMessage('Senha é obrigatória para novos usuários', 'danger');
            return false;
        }
        
        // Validar campos JSON
        try {
            const gameStats = document.getElementById('game-stats').value;
            if (gameStats) JSON.parse(gameStats);
            
            const achievements = document.getElementById('achievements').value;
            if (achievements) JSON.parse(achievements);
            
            const inventory = document.getElementById('inventory').value;
            if (inventory) JSON.parse(inventory);
        } catch (e) {
            showStatusMessage('Erro no formato JSON: ' + e.message, 'danger');
            return false;
        }
        
        return true;
    }
    
    function showLoading(show) {
        if (show) {
            loadingSpinner.style.display = 'block';
        } else {
            loadingSpinner.style.display = 'none';
        }
    }
    
    function showStatusMessage(message, type = 'info') {
        const statusDiv = document.getElementById('status-message');
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        statusDiv.appendChild(alert);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 150);
        }, 5000);
    }
    
    // Expor funções globalmente para uso nos eventos inline
    window.showUserDetails = showUserDetails;
    window.showEditUserModal = showEditUserModal;
    window.showDeleteConfirmation = showDeleteConfirmation;
});
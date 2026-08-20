(function() {
    'use strict';

    // ===== ELEMENTOS DOM =====
    const loginPanel = document.getElementById('loginPanel');
    const signupPanel = document.getElementById('signupPanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelSubtitle = document.getElementById('panelSubtitle');

    // Login
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheck = document.getElementById('rememberCheck');
    const loginSuccess = document.getElementById('loginSuccess');
    const loginMsgText = document.getElementById('loginMsgText');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const forgotLink = document.getElementById('forgotLink');

    // Signup
    const signupForm = document.getElementById('signupForm');
    const signupName = document.getElementById('signupName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const signupConfirm = document.getElementById('signupConfirm');
    const signupSuccess = document.getElementById('signupSuccess');
    const signupMsgText = document.getElementById('signupMsgText');
    const signupNameError = document.getElementById('signupNameError');
    const signupEmailError = document.getElementById('signupEmailError');
    const signupPasswordError = document.getElementById('signupPasswordError');
    const signupConfirmError = document.getElementById('signupConfirmError');

    const showSignupLink = document.getElementById('showSignupLink');
    const showLoginLink = document.getElementById('showLoginLink');

    // ===== HELPERS =====
    function showLoginMessage(text, isError = false) {
        loginMsgText.textContent = text;
        loginSuccess.classList.add('show');
        if (isError) {
            loginSuccess.classList.add('error');
        } else {
            loginSuccess.classList.remove('error');
        }
        clearTimeout(loginSuccess._timeout);
        loginSuccess._timeout = setTimeout(() => {
            loginSuccess.classList.remove('show');
        }, 5000);
    }

    function showSignupMessage(text, isError = false) {
        signupMsgText.textContent = text;
        signupSuccess.classList.add('show');
        if (isError) {
            signupSuccess.classList.add('error');
        } else {
            signupSuccess.classList.remove('error');
        }
        clearTimeout(signupSuccess._timeout);
        signupSuccess._timeout = setTimeout(() => {
            signupSuccess.classList.remove('show');
        }, 5000);
    }

    function hideAllErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('visible'));
    }

    function setFieldError(errorEl, show) {
        if (show) {
            errorEl.classList.add('visible');
        } else {
            errorEl.classList.remove('visible');
        }
    }

    // ===== ALTERNAR PAINÉIS =====
    function showLoginPanel() {
        loginPanel.classList.remove('hidden');
        signupPanel.classList.remove('active');
        panelTitle.textContent = 'Bem-vindo';
        panelSubtitle.textContent = 'Entre com suas credenciais';
        hideAllErrors();
        loginSuccess.classList.remove('show');
        signupSuccess.classList.remove('show');
    }

    function showSignupPanel() {
        loginPanel.classList.add('hidden');
        signupPanel.classList.add('active');
        panelTitle.textContent = 'Criar conta';
        panelSubtitle.textContent = 'Preencha os dados para se cadastrar';
        hideAllErrors();
        loginSuccess.classList.remove('show');
        signupSuccess.classList.remove('show');
    }

    showSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSignupPanel();
    });

    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginPanel();
    });

    // ===== BANCO DE DADOS SIMULADO (localStorage) =====
    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem('auth_users')) || [];
        } catch {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem('auth_users', JSON.stringify(users));
    }

    // Seed: criar usuário padrão
    (function seedDefaultUser() {
        const users = getUsers();
        if (users.length === 0) {
            users.push({
                name: 'Admin',
                email: 'admin@teste.com',
                password: '123456'
            });
            saveUsers(users);
        }
        const first = users[0];
        if (first) {
            emailInput.value = first.email;
            passwordInput.value = first.password;
        }
    })();

    // ==========================================
    // 🎯 LOGIN COM REDIRECIONAMENTO
    // ==========================================
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideAllErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let hasError = false;

        if (!email) {
            setFieldError(emailError, true);
            hasError = true;
        }
        if (!password || password.length < 6) {
            setFieldError(passwordError, true);
            hasError = true;
        }

        if (hasError) {
            showLoginMessage('Preencha todos os campos corretamente.', true);
            return;
        }

        const users = getUsers();
        const found = users.find(u => u.email === email && u.password === password);

        if (found) {
            showLoginMessage(`Olá, ${found.name}! Login realizado com sucesso.`);
            console.log('Usuário logado:', found);
            
            // ==========================================
            // 🚀 REDIRECIONAMENTO PARA NOVA ABA
            // ==========================================
            // Aguarda 1.5 segundos e abre em nova aba
            setTimeout(() => {
                // 👇 ALTERE A URL AQUI
                window.open('../gu/index.html', '_blank');
                
                // OUTRAS OPÇÕES:
                // window.open('dashboard.html', '_blank');  // Página local
                // window.location.href = 'https://www.google.com';  // Mesma aba
            }, 1500);
            
        } else {
            const userExists = users.some(u => u.email === email);
            if (userExists) {
                showLoginMessage('Senha incorreta. Tente novamente.', true);
            } else {
                showLoginMessage('E-mail não cadastrado. Crie uma conta!', true);
            }
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    // ===== CRIAR CONTA =====
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideAllErrors();

        const name = signupName.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value.trim();
        const confirm = signupConfirm.value.trim();
        let hasError = false;

        if (!name || name.length < 2) {
            setFieldError(signupNameError, true);
            hasError = true;
        }
        if (!email) {
            setFieldError(signupEmailError, true);
            hasError = true;
        }
        if (!password || password.length < 6) {
            setFieldError(signupPasswordError, true);
            hasError = true;
        }
        if (password !== confirm) {
            setFieldError(signupConfirmError, true);
            hasError = true;
        }

        if (hasError) {
            showSignupMessage('Preencha todos os campos corretamente.', true);
            return;
        }

        const users = getUsers();
        if (users.some(u => u.email === email)) {
            showSignupMessage('Este e-mail já está cadastrado. Faça login.', true);
            return;
        }

        users.push({ name, email, password });
        saveUsers(users);

        showSignupMessage(`Conta criada com sucesso, ${name}!`);

        signupName.value = '';
        signupEmail.value = '';
        signupPassword.value = '';
        signupConfirm.value = '';

        setTimeout(() => {
            emailInput.value = email;
            passwordInput.value = password;
            showLoginPanel();
            showLoginMessage('Conta criada! Faça login com suas credenciais.');
        }, 2000);
    });

    // ===== ESQUECEU A SENHA =====
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (!email) {
            showLoginMessage('Digite seu e-mail para recuperar a senha.', true);
            return;
        }
        const users = getUsers();
        const found = users.find(u => u.email === email);
        if (found) {
            showLoginMessage(`Instruções enviadas para ${email} (simulação).`);
        } else {
            showLoginMessage('E-mail não encontrado. Verifique ou crie uma conta.', true);
        }
    });

    // ===== LEMBRAR-ME =====
    rememberCheck.addEventListener('change', function() {
        const msg = this.checked ? 'Lembrar-me ativado.' : 'Lembrar-me desativado.';
        showLoginMessage(msg, false);
        setTimeout(() => {
            loginSuccess.classList.remove('show');
        }, 2000);
    });

    console.log('🔐 Sistema funcional com localStorage.');
    console.log('👤 Usuário padrão: admin@teste.com / 123456');
})();
(function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailGroup = document.getElementById('emailGroup');
    const passwordGroup = document.getElementById('passwordGroup');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('loginSuccess');
    const loginBtn = document.getElementById('loginBtn');

    // Remove estado de erro visual e mensagens
    function clearErrors() {
      emailGroup.classList.remove('error');
      passwordGroup.classList.remove('error');
      emailError.classList.remove('show');
      passwordError.classList.remove('show');
    }

    // Exibe erro em um campo específico
    function setError(inputGroup, errorElement, message) {
      inputGroup.classList.add('error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }

    // Valida e-mail (formato simples)
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Função de validação principal
    function validateForm() {
      let isValid = true;
      clearErrors();
      successMessage.classList.remove('show');

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Valida e-mail
      if (!email || !isValidEmail(email)) {
        setError(emailGroup, emailError, 'Digite um e-mail válido (ex: nome@dominio.com)');
        isValid = false;
      }

      // Valida senha (mínimo 6)
      if (!password || password.length < 6) {
        setError(passwordGroup, passwordError, 'A senha deve ter pelo menos 6 caracteres');
        isValid = false;
      }

      return isValid;
    }

    // Evento submit
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (validateForm()) {
        // simula sucesso no login
        successMessage.classList.add('show');
        // (opcional) desabilita o botão brevemente para evitar spam
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
        setTimeout(() => {
          loginBtn.disabled = false;
          loginBtn.style.opacity = '1';
        }, 2000);

        // limpa erros (já foi feito no validate, mas garantimos)
        clearErrors();

        // Exemplo: exibe dados no console (apenas para demonstração)
        console.log('✅ Login simulado com:', {
          email: emailInput.value.trim(),
          password: passwordInput.value
        });

        // (Opcional) resetar campos após "login"?
        // Não resetamos para manter a experiência, mas podemos.
        // Se quiser resetar, descomente:
        // emailInput.value = '';
        // passwordInput.value = '';
      } else {
        // se houver erro, garante que a mensagem de sucesso suma
        successMessage.classList.remove('show');
      }
    });

    // Limpa erros ao digitar (melhora a experiência)
    emailInput.addEventListener('input', function() {
      if (emailGroup.classList.contains('error')) {
        emailGroup.classList.remove('error');
        emailError.classList.remove('show');
      }
      // se sucesso visível, esconder ao editar
      if (successMessage.classList.contains('show')) {
        successMessage.classList.remove('show');
      }
    });

    passwordInput.addEventListener('input', function() {
      if (passwordGroup.classList.contains('error')) {
        passwordGroup.classList.remove('error');
        passwordError.classList.remove('show');
      }
      if (successMessage.classList.contains('show')) {
        successMessage.classList.remove('show');
      }
    });

    // Ao clicar no link "Esqueceu a senha" ou "Crie agora" — apenas para não recarregar a página
    document.querySelectorAll('.forgot a, .signup-footer a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        // Exemplo: apenas um alerta educativo
        alert('🔐 Funcionalidade de recuperação / cadastro (simulação).');
      });
    });

    // Ao clicar no checkbox "lembrar" só para demonstrar (não faz nada além do visual)
    // mas podemos adicionar um feedback sutil.
    const rememberCheck = document.querySelector('.remember input[type="checkbox"]');
    if (rememberCheck) {
      rememberCheck.addEventListener('change', function() {
        // apenas um feedback visual no console
        console.log(`✅ Lembrar-me: ${this.checked ? 'ativado' : 'desativado'}`);
      });
    }

  })();
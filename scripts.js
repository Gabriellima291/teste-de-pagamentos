function comprar(produto) {
    // Redireciona para o link de pagamento
    window.location.href = 'https://mpago.la/16ZE1kx';
}

// Função para verificar o pagamento (exemplo de verificação posterior)
async function verificarPagamento() {
    try {
        // Simulação de requisição ao backend para verificar o status do pagamento
        const response = await fetch('/verificar-pagamento', {
            method: 'GET'
        });

        const data = await response.json();

        if (data.status === 'approved') {
            alert('Pagamento concluído! O produto será enviado para seu email.');
            // Aqui você pode enviar o arquivo por email
            enviarArquivoEmail(data.email, data.produto);
        } else {
            alert('Compra não foi concluída. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        alert('Houve um erro ao verificar o pagamento.');
    }
}

// Função para enviar o arquivo comprado por email
async function enviarArquivoEmail(email, produto) {
    try {
        const response = await fetch('/enviar-arquivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, produto })
        });

        if (response.ok) {
            alert('Arquivo enviado com sucesso!');
        } else {
            alert('Erro ao enviar o arquivo.');
        }
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        alert('Houve um erro ao enviar o arquivo.');
    }
}

from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import os
from datetime import datetime


# =========================
# CONFIGURAÇÃO
# =========================

driver = webdriver.Chrome()

testes_passaram = 0
testes_falharam = 0

inicio = time.time()


# =========================
# PASTA DOS SCREENSHOTS
# =========================

pasta = "screenshots"

if not os.path.exists(pasta):
    os.makedirs(pasta)


data_execucao = datetime.now().strftime(
    "%Y-%m-%d_%H-%M-%S"
)


# =========================
# SCREENSHOT
# =========================

def tirar_screenshot(nome):

    caminho = os.path.join(
        pasta,
        f"{nome}_{data_execucao}.png"
    )

    driver.save_screenshot(caminho)

    print(f"📸 Screenshot: {caminho}")


# =========================
# RESULTADO
# =========================

def resultado(nome, passou):

    global testes_passaram, testes_falharam

    if passou:

        print(f"✅ PASSOU: {nome}")

        testes_passaram += 1

    else:

        print(f"❌ FALHOU: {nome}")

        testes_falharam += 1


try:

    print("=" * 55)
    print("        TESTE - CENTRAL DE AVISOS")
    print("=" * 55)

    print(f"Execução: {data_execucao}")
    print()


    # =========================
    # ABRIR SITE
    # =========================

    driver.get(
        "http://127.0.0.1:5500/jorge"
    )

    driver.maximize_window()

    time.sleep(2)


    # =========================
    # TESTE 1
    # =========================

    cards = driver.find_elements(
        By.CLASS_NAME,
        "aviso-card"
    )

    resultado(
        "Verificar se os 3 cards aparecem",
        len(cards) == 3
    )


    # =========================
    # TESTE 2
    # =========================

    botoes = driver.find_elements(
        By.CSS_SELECTOR,
        ".aviso-card .btn-info"
    )

    resultado(
        "Verificar se existem 3 botões",
        len(botoes) == 3
    )


    # ==================================================
    # AVISO DA DIREÇÃO
    # ==================================================

    botoes[0].click()

    time.sleep(1)

    modal = driver.find_element(
        By.ID,
        "modalAviso"
    )

    aberto = "mostrar" in modal.get_attribute("class")

    resultado(
        "Abrir aviso da direção",
        aberto
    )


    # 📸 PRINT COM O AVISO ABERTO
    tirar_screenshot("AVISO_ABERTO_DIRECAO")


    # Verificar título

    titulo = driver.find_element(
        By.ID,
        "tituloAviso"
    )

    resultado(
        "Título da direção está correto",
        titulo.text == "Avisos da Direção"
    )


    # Fechar

    driver.find_element(
        By.CLASS_NAME,
        "btn-fechar-modal"
    ).click()

    time.sleep(1)


    # ==================================================
    # AVISO DO PROFESSOR
    # ==================================================

    botoes = driver.find_elements(
        By.CSS_SELECTOR,
        ".aviso-card .btn-info"
    )

    botoes[1].click()

    time.sleep(1)

    modal = driver.find_element(
        By.ID,
        "modalAviso"
    )

    aberto = "mostrar" in modal.get_attribute("class")

    resultado(
        "Abrir aviso do professor",
        aberto
    )


    # 📸 PRINT COM O AVISO ABERTO
    tirar_screenshot("AVISO_ABERTO_PROFESSOR")


    titulo = driver.find_element(
        By.ID,
        "tituloAviso"
    )

    resultado(
        "Título do professor está correto",
        titulo.text == "Avisos do Professor"
    )


    # Fechar

    driver.find_element(
        By.CLASS_NAME,
        "btn-fechar-modal"
    ).click()

    time.sleep(1)


    # ==================================================
    # AVISO DA FAMÍLIA
    # ==================================================

    botoes = driver.find_elements(
        By.CSS_SELECTOR,
        ".aviso-card .btn-info"
    )

    botoes[2].click()

    time.sleep(1)

    modal = driver.find_element(
        By.ID,
        "modalAviso"
    )

    aberto = "mostrar" in modal.get_attribute("class")

    resultado(
        "Abrir aviso da família",
        aberto
    )


    # 📸 PRINT COM O AVISO ABERTO
    tirar_screenshot("AVISO_ABERTO_FAMILIA")


    titulo = driver.find_element(
        By.ID,
        "tituloAviso"
    )

    resultado(
        "Título da família está correto",
        titulo.text == "Avisos Para a Família"
    )


    # Fechar

    driver.find_element(
        By.CLASS_NAME,
        "btn-fechar-modal"
    ).click()

    time.sleep(1)


finally:

    # =========================
    # RESULTADO FINAL
    # =========================

    fim = time.time()

    tempo = fim - inicio

    total = testes_passaram + testes_falharam

    print()
    print("=" * 55)
    print("              RESULTADO FINAL")
    print("=" * 55)

    print(f"Total de testes:      {total}")
    print(f"Testes aprovados:     {testes_passaram}")
    print(f"Testes reprovados:    {testes_falharam}")
    print(f"Tempo de execução:    {tempo:.2f} segundos")

    if testes_falharam == 0:
        print()
        print("🎉 TODOS OS TESTES PASSARAM!")
    else:
        print()
        print("⚠️ ALGUNS TESTES FALHARAM.")

    print("=" * 55)


    # 📸 PRINT FINAL
    tirar_screenshot("RESULTADO_FINAL")


    driver.quit()
# Criando certificados 

Instalação do OpenSS-L Na maquina
https://slproweb.com/products/Win32OpenSSL.html

alterar o path nas variaveis do ambiente e incluir o caminho: C:\Program Files\OpenSSL-Win64\bin



1. Criação de chave e certificado para CA (Autoridade Certificadora):
 ```
openssl req -x509 -sha256 -days 356 -nodes -newkey rsa:2048 -keyout rootCA.key -out rootCA.crt
```

2. Criação de Private Key:
```
openssl genrsa -out certificado.key 2048
```

3. Criação da solicitação de assinatura de certificado (CSR):
```
openssl req -new -key certificado.key -out certificado.csr
```
NESSA PARTE 3 ALTERAR O COMMOM NAME PARA O NOME DA MAQUINA OU DNS

4. Criação do certificado assinado pela CA:
```
openssl x509 -req -in certificado.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out certificado.crt -days 365 -sha256
```

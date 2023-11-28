# Criando certificados 

Windows>>

Instalação do OpenSS-L Na maquina
https://slproweb.com/products/Win32OpenSSL.html

alterar o path nas variaveis do ambiente e incluir o caminho: C:\Program Files\OpenSSL-Win64\bin


## Editando as variáveis na criação do certificado

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



## Editando as variáveis em um arquivo configurável .cnf

1. Criação e edição do arquivo .cnf
```
echo editar esse arquivo >> openssl.cnf
```
Editar esse arquivo com as seguintes indormações:
```
[req]
default_bits       = 2048
prompt             = no
default_md         = sha256
distinguished_name = dn
req_extensions     = req_ext

[dn]
countryName            = BR
stateOrProvinceName    = Parana
localityName           = Curitiba
organizationName       = OPX
commonName             = opx.com (ou IP)

[req_ext]
subjectAltName = IP:192.168.18.192
```
Alterar o que for necessário

2. Gera um certificado autoassinado para uma Autoridade Certificadora (CA), usando configurações do arquivo openssl.cnf.
```
openssl req -x509 -sha256 -days 356 -nodes -newkey rsa:2048 -keyout rootCA.key -out rootCA.crt -config openssl.cnf
```

3. Criação de Private Key:
```
openssl genrsa -out certificado.key 2048
```

4. Gera um CSR (Certificate Signing Request) usando a chave privada criada e seguindo as configurações do arquivo openssl.cnf.
```
openssl req -new -key certificado.key -out certificado.csr -config openssl.cnf
```

5. Assina o CSR com a chave privada da CA, gerando um certificado assinado, utilizando extensões definidas no arquivo openssl.cnf, como Subject Alternative Name (SAN) e outros detalhes de configuração do certificado.
```
openssl x509 -req -in certificado.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out certificado.crt -days 365 -sha256 -extfile openssl.cnf -extensions req_ext
```

# Usa a imagem base Amazon Linux 2
FROM public.ecr.aws/amazonlinux/amazonlinux:2

# Define o diretório de trabalho
WORKDIR /app

# Atualiza o sistema e instala dependências básicas
RUN yum update -y && \
    yum install -y \
        gnupg \
        curl \
        sudo \
        shadow-utils \
        initscripts \
        iproute \
        tar \
        which \
        procps \
        openssl

# Adiciona o repositório oficial do MongoDB 7.0
RUN echo -e "[mongodb-org-7.0]\n\
name=MongoDB Repository\n\
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/7.0/x86_64/\n\
gpgcheck=1\n\
enabled=1\n\
gpgkey=https://pgp.mongodb.com/server-7.0.asc" \
> /etc/yum.repos.d/mongodb-org-7.0.repo

# Instala o MongoDB
RUN yum install -y mongodb-org && \
    yum clean all

# Cria usuário mongodb (se não existir)
RUN id -u mongodb &>/dev/null || useradd -r -s /bin/false mongodb

# Copia os arquivos de configuração
COPY config /config
RUN chmod -R +rwx /config && \
    cp /config/mongod.conf /etc/mongod.conf

# Cria diretório de dados do MongoDB
RUN mkdir -p /data/db && \
    chown -R mongodb:mongodb /data/db

# Define o volume para persistência de dados (opcional)
VOLUME ["/data/db"]

# Expõe a porta padrão do MongoDB
EXPOSE 27017

# Comando de inicialização
CMD ["/usr/bin/mongod", "--config", "/etc/mongod.conf"]

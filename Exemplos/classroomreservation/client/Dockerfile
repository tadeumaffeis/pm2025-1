FROM nginx:stable

# ✅ Remover configurações padrões (opcional)
RUN rm -rf /etc/nginx/conf.d/*

# ✅ Copiar seu arquivo de configuração
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# ✅ Copiar os arquivos do seu site
COPY ./dist /var/www/html

# ✅ Expor porta HTTP
EXPOSE 80

# ✅ Comando padrão (já vem por padrão, mas pode ser declarado)
CMD ["nginx", "-g", "daemon off;"]

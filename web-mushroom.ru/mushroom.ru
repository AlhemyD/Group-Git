server {
	listen 80;
	listen [::]:80;

	root /var/www/html/mushroom.ru;

	index project.html index.html index.htm index.nginx-debian.html;

	server_name mushroom.ru;

	location / {
		try_files $uri $uri/ =404;
	}
}
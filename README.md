Deployment

cp .env.example .env
composer install
php artisan migrate --seed

php artisan key:generate
npm install
npm run dev


If you have file/photo fields, run php artisan storage:link command.
Laravel Sanctum for API Auth: If you are using custom hostname for project other than localhost make sure that value of SANCTUM_STATEFUL_DOMAINS variable in .env file is the same as your hostname in browser. Example: SANCTUM_STATEFUL_DOMAINS=myproject.test
And that's it, go to your domain and login:

Default credentials
Username: admin@admin.com
Password: password
For more information, potential errors and related links, you can read more detailed installation guide here


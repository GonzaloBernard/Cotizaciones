Deployment
Extract the archive and put it in the folder you want
Run cp .env.example .env file to copy example file to .env
Then edit your .env file with DB credentials and other settings.
Run composer install command
Run php artisan migrate --seed command.
Notice: seed is important, because it will create the first admin user for you.
Run php artisan key:generate command.
Run npm install
Run npm run dev
If you have file/photo fields, run php artisan storage:link command.
Laravel Sanctum for API Auth: If you are using custom hostname for project other than localhost make sure that value of SANCTUM_STATEFUL_DOMAINS variable in .env file is the same as your hostname in browser. Example: SANCTUM_STATEFUL_DOMAINS=myproject.test
And that's it, go to your domain and login:

Default credentials
Username: admin@admin.com
Password: password
For more information, potential errors and related links, you can read more detailed installation guide here
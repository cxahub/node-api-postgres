# node-api-postgres
NodeJS & Express JS app for BTP.

You will need to create a .env file in the root for this project and include these keys for your local environment:

LOCAL_DB_HOSTNAME=localhost
LOCAL_DB_PORT=5432
LOCAL_DB_DATABASE={YOUR LOCAL DATABASE NAME}
LOCAL_DB_USERNAME={YOUR LOCAL DATABASE USERNAME}
LOCAL_DB_PASSWORD={YOUR LOCAL DATABASE PASSWORD}

SERVICE_USERNAME={YOUR SERVICE USERNAME}
SERVICE_PASSWORD={YOUR PASSWORD-GEN PASSWORD}

As for your service binding name for leveraging BTP Postgres Hyperscaler database, modify the manifest.yml "services" key file accordingly.

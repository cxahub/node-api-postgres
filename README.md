# node-api-postgres
<h2>NodeJS & Express JS app for BTP.</h2>
This application is for a node, express api server to be used for applications in the BTP environment w/ Cloud Foundry.

<h3>.env</h3>
You will need to create a .env file in the root for this project and include these keys for your local environment:

LOCAL_DB_HOSTNAME=localhost<br/>
LOCAL_DB_PORT=5432<br/>
LOCAL_DB_DATABASE={YOUR LOCAL DATABASE NAME}<br/>
LOCAL_DB_USERNAME={YOUR LOCAL DATABASE USERNAME}<br/>
LOCAL_DB_PASSWORD={YOUR LOCAL DATABASE PASSWORD}<br/>
SERVICE_USERNAME={YOUR SERVICE USERNAME}<br/>
SERVICE_PASSWORD={YOUR PASSWORD-GEN PASSWORD}<br/>

<h3>Manifest File</h3>
As for your service binding name for leveraging BTP Postgres Hyperscaler database, modify the manifest.yml "services" key file accordingly.

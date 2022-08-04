# node-api-postgres
<h2>NodeJS & Express JS app for BTP.</h2>
This application is for a node, express api server to be used for applications in the BTP environment w/ Cloud Foundry. It is assumed you understand setup for SAP BTP either a trial or sub account, the Cloud Foundry CLI, Service Marketplace and instances, PostgreSQL Hyperscaler, and service binding.

<h3>Features</h3>
<ul>
  <li>SAP BTP enabled</li>
  <li>PostgreSQL database</li>
  <li>Async routes</li>
  <li>Caching</li>
  <li>JWT token security</li>
</ul>

<h3>.env</h3>
You will need to create a .env file in the root for this project and include these keys for your local environment:<br/><br/>

LOCAL_DB_HOSTNAME=localhost<br/>
LOCAL_DB_PORT=5432<br/>
LOCAL_DB_DATABASE={YOUR LOCAL DATABASE NAME}<br/>
LOCAL_DB_USERNAME={YOUR LOCAL DATABASE USERNAME}<br/>
LOCAL_DB_PASSWORD={YOUR LOCAL DATABASE PASSWORD}<br/>
SERVICE_USERNAME={YOUR SERVICE USERNAME}<br/>
SERVICE_PASSWORD={YOUR PASSWORD-GEN PASSWORD}<br/>

<h3>Manifest File</h3>
As for your service binding name for leveraging BTP Postgres Hyperscaler database, modify the manifest.yml "services" key file accordingly.

<h3>Password Gen Tool w/ Postman</h3>
In order to call api's you will require a encrypted password for your SERVICE_PASSWORD key in your .env file. Use the built-in api to generate the password:<br/><br/>

In Postman access the following API once youv'e satrted your server. It will return the password key.<br/>
http://localhost:8080/api/passwordgen/{MY_PASSWORD}

<h3>Token Gen Tool w/ Postman</h3>
In order to access any API (other than the password gen tool API) you will need a token. To create a token use the token gen tool API.<br/><br/>

In Postman access the following API once youv'e satrted your server. It will return the token required for your header "x-auth-token" key.<br/>
http://localhost:8080/api/auth<br/><br/>

In the body of the request use this JSON.<br/><br/>
{<br/>
"email":"{SERVICE USERNAME}",<br/>
"password":"{SERVICE PASSWORD}"<br/>
}

<h3>Summary</h3>
This should get you started and calling some API. The example API's include some basic tables and data to call. Enjoy!

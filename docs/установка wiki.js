[TOC]

## Установка Wiki.JS

Все пункты установки будем выполнять преимущественно в терминале.

Загружаем последнюю версию Wiki.js:

```yml
wget https://github.com/Requarks/wiki/releases/download/2.5.144/wiki-js.tar.gz
```
Создаем директорию и распаковываем в неё полученный архив, затем переходим в полученную директорию:
```yml
mkdir wiki
tar xzf wiki-js.tar.gz -C ./wiki
cd ./wiki
```
По рекомендации разработчиков, переименовываем предоставленный дистрибьютивом конфиг.файл в `config.yml`:
```yml
mv config.sample.yml config.yml
```
Редактировать конфиг.файл и заполнять строки по настройке Вашей БД и настройке портов рекомендуется согласно предоставленному референсу > [Configuration Reference](https://docs.requarks.io/install/config):
```yml
nano config.yml
```
После того как настроили конфигурационный файл (мне для тестов подошли предустановленные настройки) - переходим к созданию базы данных (PostreSQL).

>Сама Wiki.js не создает базу данных, её необходимо создать самостоятельно.

## Создание БД (PostgreSQL)
Если в системе не установлена данная система, то предварительно установим её:
```yml
sudo apt install postgresql-12.4
```
После установки системы управления зайдем в оболочку системы управления базами данных:

```yml
sudo -u postgres psql
```
Если все хорошо, мы увидим приглашение системы:
```yml
psql (12.4 (Ubuntu 12.4-0ubuntu0.20.04.1))
Type "help" for help.

postgres=#
```
Далее создадим базу с именем `wiki`, указанную ранее в конф.файле `config.yml`
```postgres
CREATE DATABASE wiki;
```
Затем создадим пользователя `wikijs` и пароль `wikilsrocks`, тоже ранее указанный при настройке файла `config.yml
```postgres
CREATE USER wikijs WITH password 'wikijsrocks';
```
И передадим права на "использование" базы `wiki` пользователю `wikijs`
```postgres
GRANT ALL ON DATABASE wiki TO wikijs;
```
После оповещения системы о выдаче прав (`GRANT`)- можно выйти из сессии postgres, набрав в терминале:
```
\q
```
## Завершение установки

Теперь можем запустить Wiki.js:
```
node server
```
Ждем приглашения открыть страницу в браузере. После предложения открываем в браузере страничку по адресу localhost:3000 и заканчиваем установку Wiki.js с помощью мастера установки:
```bash
Loading configuration from /home/user/wikijs/config.yml... OK
2020-10-02T11:19:09.050Z [MASTER] info: =======================================
2020-10-02T11:19:09.051Z [MASTER] info: = Wiki.js 2.5.144 =====================
2020-10-02T11:19:09.052Z [MASTER] info: =======================================
2020-10-02T11:19:09.052Z [MASTER] info: Initializing...
2020-10-02T11:19:09.373Z [MASTER] info: Using database driver pg for postgres [ OK ]
2020-10-02T11:19:09.377Z [MASTER] info: Connecting to database...
2020-10-02T11:19:09.402Z [MASTER] info: Database Connection Successful [ OK ]
2020-10-02T11:19:11.116Z [MASTER] warn: DB Configuration is empty or incomplete. Switching to Setup mode...
2020-10-02T11:19:11.116Z [MASTER] info: Starting setup wizard...
2020-10-02T11:19:11.232Z [MASTER] info: Starting HTTP server on port 3000...
2020-10-02T11:19:11.232Z [MASTER] info: HTTP Server on port: [ 3000 ]
2020-10-02T11:19:11.237Z [MASTER] info: HTTP Server: [ RUNNING ]
2020-10-02T11:19:11.237Z [MASTER] info: 🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻
2020-10-02T11:19:11.237Z [MASTER] info: 
2020-10-02T11:19:11.237Z [MASTER] info: Browse to http://YOUR-SERVER-IP:3000/ to complete setup!
2020-10-02T11:19:11.238Z [MASTER] info: 
2020-10-02T11:19:11.238Z [MASTER] info: 🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺
2020-10-02T11:24:12.674Z [MASTER] info: Creating data directories...
...
2020-10-02T11:24:14.554Z [MASTER] info: Stopping Setup...
2020-10-02T11:24:14.556Z [MASTER] info: Setup stopped. Starting Wiki.js...
```


---

## Базовая конфигурация

A config file, named `config.yml`, must be located at the root of your Wiki.js installation.

Note: If you downloaded Wiki.js as a zip / tar.gz package, you must rename the file `config.sample.yml` to `config.yml`

Listed below are all the possible options that can be entered in your `config.yml` file.

### Basics
The configuration settings in the basics section are required and must be defined in your `config.yml` file.

### HTTP
Specify the port the HTTP server will listen on. This is usually `80` for a standalone server that is directly accessible or `3000` if behind a reverse-proxy.

```
port: 3000
```

Note that if you choose to listen directly on port `80`, some operating systems requires special permissions to be enabled first. An error will be displayed when starting Wiki.js if that is the case.

### Database
Wiki.js requires one of the many supported database engines.

>PostgreSQL is the recommended engine for best performance, features and future compatibility.

```
db:
  type: postgres
  host: localhost
  port: 5432
  user: wikijs
  pass: wikijsrocks
  db: wiki
```

If your database requires an SSL connection, check the [Database over SSL](https://docs.requarks.io/install/config#database-over-ssl) section.




---
Источники:

[Начало работы с PostgreSQL](https://eax.me/postgresql-install/)

[Wiki.JS_docs](https://docs.requarks.io/install/linux)

[Установка и настройка PostgreSQL](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)

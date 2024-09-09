---
outline: deep
---

# MySQL 安装

## Ubuntu

- mysql5.x: [ubuntu安装mysql数据库教程_w3cschool](https://www.w3cschool.cn/mysql/mysql-2i4k2owh.html)
- mysql8.x: [https://blog.csdn.net/jack_dh/article/details/124342524](https://blog.csdn.net/jack_dh/article/details/124342524)

## Centos安装mysql5.7

下载并安装官方mysql的Yum Repository
```shell
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
```

yum安装mysql的rpm包
```shell
yum -y install mysql57-community-release-el7-10.noarch.rpm
yum -y update
```

安装MySQL服务器
```shell
yum -y install mysql-server mysql mysql-devel
```

启动并测试mysql是否正常安装
```shell
# 启动mysql
systemctl start mysqld.service

# 查看mysql的运行状态
systemctl status mysqld.service

# 找到mysql的root用户的登录密码
grep "password" /var/log/mysqld.log

# 登录到mysql
mysql -u root -p xxx

# 修改mysql的root用户的密码，注意：密码设置必须要大小写字母数字和特殊符号（,/';:等）,不然不能配置成功
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MySQL123..';


# 查看mysql的密码策略
mysql> show variables like '%password%';
+----------------------------------------+-----------------+
| Variable_name                          | Value           |
+----------------------------------------+-----------------+
| default_password_lifetime              | 0               |
| disconnect_on_expired_password         | ON              |
| log_builtin_as_identified_by_password  | OFF             |
| mysql_native_password_proxy_users      | OFF             |
| old_passwords                          | 0               |
| report_password                        |                 |
| sha256_password_auto_generate_rsa_keys | ON              |
| sha256_password_private_key_path       | private_key.pem |
| sha256_password_proxy_users            | OFF             |
| sha256_password_public_key_path        | public_key.pem  |
| validate_password_check_user_name      | OFF             |
| validate_password_dictionary_file      |                 |
| validate_password_length               | 8               |
| validate_password_mixed_case_count     | 1               |
| validate_password_number_count         | 1               |
| validate_password_policy               | MEDIUM          |
| validate_password_special_char_count   | 1               |
+----------------------------------------+-----------------+
17 rows in set (0.01 sec)
```

## 修改密码策略

Linux系统下打开 `/etc/my.cnf` 文件，并对以下配置进行二选一修改：
```shell
#添加validate_password_policy配置
validate_password_policy=0
#关闭密码策略
validate_password = off
```
重启mysql服务：

```shell
systemctl restart mysqld
```

之后就可以修改为弱密码了！

```sql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysqlvip';
Query OK, 0 rows affected (0.00 sec)

# 命令立即生效
mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> exit;
Bye
```

## Windows上安装MySQL

1. windows上安装mysql8.0: [https://waylau.com/installing-mysql-8-on-windows/](https://waylau.com/installing-mysql-8-on-windows/)
2. 注册mysql服务及详细安装教程：[https://segmentfault.com/a/1190000018176420](https://segmentfault.com/a/1190000018176420)

## Docker中安装MySQL
> docker mysql镜像官网：[https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)

### MySQL5.7
```shell
docker run -d -p 3306:3306 --name mysql57 -v ~/docker_data/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

### MySQL8
```shell
docker run -d -p 3306:3306 --name mysql8 -v ~/docker_data/mysql8:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:8 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
在Centos7中，如果出现权限问题，可以参考：[https://www.cnblogs.com/HuangK-HUST/p/12823099.html](https://www.cnblogs.com/HuangK-HUST/p/12823099.html)

## Логика работы API-запросов
### 1. Базовая конфигурация API

Создаётся экземпляр axios с базовыми настройками:
- baseURL: "/api" — все запросы отправляются на сервер с префиксом /api
- withCredentials: true — позволяет отправлять cookies (используется для refresh-токена)

```js
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
```

### 2. Автоматическое добавление accessToken

Перед каждым запросом выполняется request interceptor, который:
- Берёт accessToken из localStorage
- Если токен существует — добавляет его в заголовок:

```
Authorization: Bearer <accessToken>
```

### 3. Автоматическое обновление accessToken
Используется `response interceptor` для обработки ошибок авторизации.

**Сценарий:**
- Если сервер возвращает 403 (accessToken истёк)
- И запрос ещё не повторялся (_retry !== true)

**Тогда:**
1. Отправляется POST /api/refresh
2. Сервер возвращает новый accessToken
3. Новый токен сохраняется в localStorage
4. Исходный запрос повторяется с новым токеном

```js
const res = await api.post("/refresh");
localStorage.setItem("accessToken", newToken);
return api(originalRequest);
```

**Если refresh-токен тоже истёк:**
- accessToken удаляется из localStorage
- Пользователь перенаправляется на /login

### 4. Работа с JWT на клиенте
Для декодирования токена используется библиотека `jwt-decode`.

Для проверки истечения токена используется функция `isTokenExpired(token)`:
- Декодирует токен
- Сравнивает поле exp с текущим временем
- Возвращает true, если токен истёк

Для получение роли пользователя используется функция `getUserRole(token)`:
- Декодирует токен
- Возвращает поле role
- Если токен некорректный — возвращает null
- 
rgb(197, 214, 239)
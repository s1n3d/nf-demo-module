select
    id,
    username,
    fullname,
    extra,
    case when username = 'user' then
        '+7(960)037-37-37'
    end as mobile,
    case when username = 'user' then
            'user@mail.com'
        end as email
  from nfc.v4users u
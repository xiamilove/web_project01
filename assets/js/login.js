$(function() {
    // 切换到注册表单
    $('#btn_reg').on('click', function() {
        $('.reg-bd').show();
        $('.login-bd').hide();
    })


    // 切换到登录表单
    $('#btn_login').on('click', function() {
        $('.reg-bd').hide();
        $('.login-bd').show();
    })

    //全局配置ajax请求的url



    // 自定义验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-bd [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //监听表单注册事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();

        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status != 0) {
                // return console.log(res.message);
                layer.msg(res.message);
            }
            layer.msg(res.message);
            //注册成功跳转到登录
            $('#btn_login').click();
        })

    })

    //监听登录事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        console.log("11");
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })


})
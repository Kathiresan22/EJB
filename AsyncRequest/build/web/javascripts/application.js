var count = 0;
var groupid="secretgroup"
var app = {
    url: '/async-request-war/chat',
    initialize: function () {
        $('login-name').focus();
        app.listen();
    },
    listen: function () {
        $('comet-frame').src = app.url + '?' + count;
        count++;
    },
    login: function () {
        var name = $F('login-name');
        var groupname=$F('group-name');
        console.log(groupname);
        if (!name.length > 0 || groupid!=groupname) {
            if (!name.length > 0)
            {
                $('system-message').style.color = 'red';
                $('login-name').focus();
            }
            
            if(groupid!=groupname)
            {
                $('system-message-group').style.color = 'red';            
                $('group-name').focus();
            }
            return;
        }
        $('system-message').style.color = '#2d2b3d';
        $('system-message').innerHTML = name + ':';

        $('login-button').disabled = true;
        $('login-form').style.display = 'none';
        $('message-form').style.display = '';

        var query =
                'action=login' +
                '&name=' + encodeURI($F('login-name'));
        new Ajax.Request(app.url, {
            postBody: query,
            onSuccess: function () {
                $('message').focus();
            }
        });
    },
    post: function () {
        var message = $F('message');
        if (!message > 0) {
            return;
        }
        $('message').disabled = true;
        $('post-button').disabled = true;

        var query =
                'action=post' +
                '&name=' + encodeURI($F('login-name')) +
                '&message=' + encodeURI(message);
        new Ajax.Request(app.url, {
            postBody: query,
            onComplete: function () {
                $('message').disabled = false;
                $('post-button').disabled = false;
                $('message').focus();
                $('message').value = '';
            }
        });
    },
    update: function (data) {
        // var p = document.createElement('p');
        //p.innerHTML = data.name + ':<br/>' +'<input type="checkbox" id="myCheck">'+ data.message;

        var div=document.createElement('div');
        div.id=data.message;
        
        
        
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.id = data.message;
        
      
        
        
        var msg = document.createElement('label');
        msg.htmlFor = data.message;
        

        //checkbox.innerHTML = data.name + ':<br/>' + data.message + '</input>';
        /* var label = document.createElement('label');
         label.htmlFor = "myCheck";
         label.appendChild(document.createTextNode(data.name+":"));
         
         // label.appendChild(document.createElement('br'));
         
         label.appendChild(document.createTextNode(data.message));
         
         label.appendChild(document.createElement('br'));
         */


        
        msg.innerHTML = data.name + ':<br/>' + data.message+'<br/>';

        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                console.log('checked');
                
                 //$('display').removeChild(msg);
                
                
                msg.innerHTML= data.name+':<br/>'+'<strike>'  + data.message+'</strike><br/>';                
               
                $('display').replaceChild(msg);

            } else if(!event.target.checked)  {
                 msg.innerHTML = data.name + ':<br/>' + data.message+'<br/>';
                console.log('not checked');
            }
        });


        $('display').appendChild(checkbox);
        $('display').appendChild(msg);
        // $('display').appendChild(label);

        new Fx.Scroll('display').down();
    },    
    
};
var rules = {
    '#login-name': function (elem) {
        Event.observe(elem, 'keydown', function (e) {
            if (e.keyCode == 13) {
                $('login-button').focus();
            }
        });
    },
    '#login-button': function (elem) {
        elem.onclick = app.login;
    },
    '#message': function (elem) {
        Event.observe(elem, 'keydown', function (e) {
            if (e.shiftKey && e.keyCode == 13) {
                $('post-button').focus();
            }
        });
    },
    '#post-button': function (elem) {
        elem.onclick = app.post;
    },

    '#myCheck': function (elem) {

        elem.addEventListener('change', (event) => {
            if (event.target.checked) {
                console.log('checked');               
            } else {
                console.log('not checked');
            }
        });

    }

};
Behaviour.addLoadEvent(app.initialize);
Behaviour.register(rules);

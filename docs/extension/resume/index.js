<<<<<<< HEAD
!function r(d,c,a){function o(t,e){if(!c[t]){if(!d[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(i)return i(t,!0);throw(n=new Error("Cannot find module'"+t+"'")).code="MODULE_NOT_FOUND",n}n=c[t]={exports:{}},d[t][0].call(n.exports,function(e){return o(d[t][1][e]||e)},n,n.exports,r,d,c,a)}return c[t].exports}for(var i="function"==typeof require&&require,e=0;e<a.length;e++)o(a[e]);return o}({1:[function(e,t,n){"use strict";function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r,d;(r={url:"data.json",success:function(e){var t,a,o,m,s,n,r,d,c,i,l;"object"===u(e)&&e.resume&&(d=e,c=document.querySelector("#avatar"),i=document.createElement("img"),l=document.createElement("input"),i.id="photo",i.src=d.resume.side.avatar,l.id="fileOpen",l.type="file",l.accept="image/*",c.appendChild(i),c.appendChild(l),l.onchange=function(){var e,t=l.files[0];t&&((e=new FileReader).readAsDataURL(t),e.onload=function(){i.src=e.result})},d=e,document.querySelector("#name").innerHTML=d.resume.side.brand.name,document.querySelector("#position").innerHTML=d.resume.side.brand.position,c=e,document.querySelector("#address").innerHTML=c.resume.side.personal.address,document.querySelector("#phone").innerHTML=c.resume.side.personal.phone,document.querySelector("#email").innerHTML=c.resume.side.personal.email,document.querySelector("#www").innerHTML=c.resume.side.personal.www,document.querySelector("#github").innerHTML=c.resume.side.personal.github,d=e,document.querySelector("#frontend").innerHTML=d.resume.side.skill.frontend,document.querySelector("#backend").innerHTML=d.resume.side.skill.backend,document.querySelector("#database").innerHTML=d.resume.side.skill.database,document.querySelector("#tool").innerHTML=d.resume.side.skill.tool,c=e,(d=document.querySelector("#language"))&&(n=d.querySelector(".ruler"),r=d.querySelector(".desc"),c.resume.side.language.forEach(function(e){var t=document.createElement("div");t.style.width=e.data+"%",n.appendChild(t);t=document.createElement("div");t.innerHTML=e.name,r.appendChild(t)})),c=e,document.querySelector("#intro").innerHTML=c.resume.main.intro,c=e,m=document.querySelector("html"),s=document.querySelector("#education"),c.resume.main.education.forEach(function(e){var t=document.createElement("table"),n=document.createElement("tr"),r=document.createElement("tr"),d=document.createElement("td"),c=document.createElement("td");d.className="school",d.innerHTML=e.school,c.innerHTML=e.start.concat("&nbsp;-&nbsp;",e.end),n.appendChild(d),n.appendChild(c);var a,o,i,l,u,d=document.createElement("td"),c=document.createElement("td");d.innerHTML=e.field,c.innerHTML=e.grade?("zh"===m.lang?" 成绩 ":"Grade")+":&nbsp;"+e.grade:"",r.appendChild(d),r.appendChild(c),t.appendChild(n),t.appendChild(r),e.extend&&(i=document.createElement("tr"),r=document.createElement("td"),a=document.createElement("div"),l=document.createElement("div"),a.className="ruler",l.className="desc",r.appendChild(a),r.appendChild(l),o=100/e.semester,e.extend.forEach(function(e,t){var n,r;2===e.data.length&&(r=document.createElement("div"),(n=document.createElement("div")).className="sub",n.setAttribute("data-num",t+1),n.style.width=e.data[1]*o+"%",(t=document.createElement("div")).className="sup",t.style.width=e.data[0]*o+"%",r.appendChild(n),r.appendChild(t),a.appendChild(r),(r=document.createElement("div")).innerHTML=e.name,l.appendChild(r))}),i.appendChild(r),t.appendChild(i)),e.desc&&(i=document.createElement("tr"),l=document.createElement("td"),u=document.createElement("ul"),e.desc.forEach(function(e){var t=document.createElement("li");t.innerHTML=e,u.appendChild(t)}),l.appendChild(u),i.appendChild(l),t.appendChild(i)),s.appendChild(t)}),c=e,o=document.querySelector("#experience"),c.resume.main.experience.forEach(function(e){var t=document.createElement("table"),n=document.createElement("tr"),r=document.createElement("tr"),d=document.createElement("td");d.className="title",d.innerHTML=e.title,n.appendChild(d);var c=document.createElement("td"),d=document.createElement("td");c.className="employer",c.innerHTML=e.employer,d.innerHTML=e.start.concat("&nbsp;-&nbsp;",e.end),r.appendChild(c),r.appendChild(d),t.appendChild(n),t.appendChild(r);var n=document.createElement("tr"),r=document.createElement("td"),a=document.createElement("ul");e.desc.forEach(function(e){var t=document.createElement("li");t.innerHTML=e,a.appendChild(t)}),r.appendChild(a),n.appendChild(r),t.appendChild(n),o.appendChild(t)}),c=e,a=document.querySelector("#project"),c.resume.main.project.forEach(function(e){var t=document.createElement("table"),n=document.createElement("tr"),r=document.createElement("td"),d=document.createElement("td");r.className="title",r.innerHTML=e.title,d.innerHTML=e.start.concat("&nbsp;-&nbsp;",e.end),n.appendChild(r),n.appendChild(d),t.appendChild(n);var d=document.createElement("tr"),n=document.createElement("td"),c=document.createElement("ul");e.desc.forEach(function(e){var t=document.createElement("li");t.innerHTML=e,c.appendChild(t)}),n.appendChild(c),d.appendChild(n),t.appendChild(d),a.appendChild(t)}),c=e,Array.isArray(c.keyword)&&c.keyword.length&&(t=document.querySelector("#main"),c.keyword.forEach(function(e){t.innerHTML=t.innerHTML.replace(e,"<strong>"+e+"</strong>")})),function(e,t){var n=document.querySelector("#resume"),r=document.querySelector("#side");switch(t&&(n.style.maxWidth=t),e.toLowerCase()){case"letter":n.style.minHeight=279/216*n.offsetWidth+"px";break;case"a4":n.style.minHeight=297/210*n.offsetWidth+"px"}r.style.height=n.offsetHeight+"px"}(e.size,e.custom_width),document.querySelector("#print").onclick=function(){window.print?window.print():document.execCommand("print")})}}).url&&((d=new XMLHttpRequest).open("get",r.url),d.responseType="json",d.addEventListener("readystatechange",function(){4===d.readyState&&200===d.status&&d.response&&r.success&&r.success(d.response)}),d.send())},{}]},{},[1]);
=======
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module'"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";

function _typeof(obj) {"@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;}; } else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}; } return _typeof(obj); }

function fillAvatar(data) {var avatar = document.querySelector('#avatar');
  var photo = document.createElement('img');
  var fileOpen = document.createElement('input');
  photo.id = 'photo';
  photo.src = data.resume.side.avatar;
  fileOpen.id = 'fileOpen';
  fileOpen.type = 'file';
  fileOpen.accept = 'image/*';
  avatar.appendChild(photo);
  avatar.appendChild(fileOpen);

  fileOpen.onchange = function () {var file = fileOpen.files[0];

    if (file) {var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {photo.src = reader.result;};
    }
  };
}

function fillBrand(data) {var name = document.querySelector('#name');
  name.innerHTML = data.resume.side.brand.name;
  var position = document.querySelector('#position');
  position.innerHTML = data.resume.side.brand.position;
}

function fillPersonal(data) {var address = document.querySelector('#address');
  address.innerHTML = data.resume.side.personal.address;
  var phone = document.querySelector('#phone');
  phone.innerHTML = data.resume.side.personal.phone;
  var email = document.querySelector('#email');
  email.innerHTML = data.resume.side.personal.email;
  var www = document.querySelector('#www');
  www.innerHTML = data.resume.side.personal.www;
  var github = document.querySelector('#github');
  github.innerHTML = data.resume.side.personal.github;
}

function fillSkill(data) {var frontend = document.querySelector('#frontend');
  frontend.innerHTML = data.resume.side.skill.frontend;
  var backend = document.querySelector('#backend');
  backend.innerHTML = data.resume.side.skill.backend;
  var database = document.querySelector('#database');
  database.innerHTML = data.resume.side.skill.database;
  var tool = document.querySelector('#tool');
  tool.innerHTML = data.resume.side.skill.tool;
}

function fillLanguage(data) {var language = document.querySelector('#language');
  if (!language) return;
  var ruler = language.querySelector('.ruler');
  var desc = language.querySelector('.desc');
  var languages = data.resume.side.language;
  languages.forEach(function (lang) {var block = document.createElement('div');
    block.style.width = lang.data + '%';
    ruler.appendChild(block);
    var name = document.createElement('div');
    name.innerHTML = lang.name;
    desc.appendChild(name);
  });
}

function fillIntro(data) {var intro = document.querySelector('#intro');
  intro.innerHTML = data.resume.main.intro;
}

function fillEducation(data) {var html = document.querySelector('html');
  var education = document.querySelector('#education');
  var edus = data.resume.main.education;
  edus.forEach(function (edu) {var table = document.createElement('table');
    var tr0 = document.createElement('tr');
    var tr1 = document.createElement('tr');
    var school = document.createElement('td');
    var time = document.createElement('td');
    school.className = 'school';
    school.innerHTML = edu.school;
    time.innerHTML = edu.start.concat("&nbsp;-&nbsp;", edu.end);
    tr0.appendChild(school);
    tr0.appendChild(time);
    var field = document.createElement('td');
    var grade = document.createElement('td');
    field.innerHTML = edu.field;
    grade.innerHTML = edu.grade ? (html.lang === 'zh' ? '成绩' : 'Grade') + ':&nbsp;' + edu.grade : '';
    tr1.appendChild(field);
    tr1.appendChild(grade);
    table.appendChild(tr0);
    table.appendChild(tr1);

    if (edu.extend) {var tr2 = document.createElement('tr');
      var extend = document.createElement('td');
      var ruler = document.createElement('div');
      var desc = document.createElement('div');
      ruler.className = 'ruler';
      desc.className = 'desc';
      extend.appendChild(ruler);
      extend.appendChild(desc);
      var gridWidth = 100 / edu.semester;
      edu.extend.forEach(function (ex, i) {if (ex.data.length === 2) {var block = document.createElement('div');
          var sub = document.createElement('div');
          sub.className = 'sub';
          sub.setAttribute('data-num', i + 1);
          sub.style.width = ex.data[1] * gridWidth + '%';
          var sup = document.createElement('div');
          sup.className = 'sup';
          sup.style.width = ex.data[0] * gridWidth + '%';
          block.appendChild(sub);
          block.appendChild(sup);
          ruler.appendChild(block);
          var inlineBlock = document.createElement('div');
          inlineBlock.innerHTML = ex.name;
          desc.appendChild(inlineBlock);
        }
      });
      tr2.appendChild(extend);
      table.appendChild(tr2);
    }

    if (edu.desc) {var tr3 = document.createElement('tr');
      var desc = document.createElement('td');
      var ul = document.createElement('ul');
      edu.desc.forEach(function (text) {var li = document.createElement('li');
        li.innerHTML = text;
        ul.appendChild(li);
      });
      desc.appendChild(ul);
      tr3.appendChild(desc);
      table.appendChild(tr3);
    }

    education.appendChild(table);
  });
}

function fillProject(data) {var project = document.querySelector('#project');
  var projs = data.resume.main.project;
  projs.forEach(function (proj) {var table = document.createElement('table');
    var tr0 = document.createElement('tr');
    var title = document.createElement('td');
    var time = document.createElement('td');
    title.className = 'title';
    title.innerHTML = proj.title;
    time.innerHTML = proj.start.concat("&nbsp;-&nbsp;", proj.end);
    tr0.appendChild(title);
    tr0.appendChild(time);
    table.appendChild(tr0);
    var tr1 = document.createElement('tr');
    var desc = document.createElement('td');
    var ul = document.createElement('ul');
    proj.desc.forEach(function (text) {var li = document.createElement('li');
      li.innerHTML = text;
      ul.appendChild(li);
    });
    desc.appendChild(ul);
    tr1.appendChild(desc);
    table.appendChild(tr1);
    project.appendChild(table);
  });
}

function fillExperience(data) {var experience = document.querySelector('#experience');
  var exps = data.resume.main.experience;
  exps.forEach(function (exp) {var table = document.createElement('table');
    var tr0 = document.createElement('tr');
    var tr1 = document.createElement('tr');
    var title = document.createElement('td');
    title.className = 'title';
    title.innerHTML = exp.title;
    tr0.appendChild(title);
    var employer = document.createElement('td');
    var time = document.createElement('td');
    employer.className = 'employer';
    employer.innerHTML = exp.employer;
    time.innerHTML = exp.start.concat("&nbsp;-&nbsp;", exp.end);
    tr1.appendChild(employer);
    tr1.appendChild(time);
    table.appendChild(tr0);
    table.appendChild(tr1);
    var tr2 = document.createElement('tr');
    var desc = document.createElement('td');
    var ul = document.createElement('ul');
    exp.desc.forEach(function (text) {var li = document.createElement('li');
      li.innerHTML = text;
      ul.appendChild(li);
    });
    desc.appendChild(ul);
    tr2.appendChild(desc);
    table.appendChild(tr2);
    experience.appendChild(table);
  });
}

function highlight(data) {if (Array.isArray(data.keyword) && data.keyword.length) {var main = document.querySelector('#main');
    data.keyword.forEach(function (word) {main.innerHTML = main.innerHTML.replace(word, '<strong>' + word + '</strong>');
    });
  }
}

function fixResume(paper, custom) {var resume = document.querySelector('#resume');
  var side = document.querySelector('#side');
  custom && (resume.style.maxWidth = custom);

  switch (paper.toLowerCase()) {
    case 'letter':
      resume.style.minHeight = 279 / 216 * resume.offsetWidth + 'px';
      break;

    case 'a4':
      resume.style.minHeight = 297 / 210 * resume.offsetWidth + 'px';
  }

  side.style.height = resume.offsetHeight + 'px';
}

function setPrint() {var print = document.querySelector('#print');

  print.onclick = function () {window.print ? window.print() : document.execCommand('print');
  };
}

function generate(data) {if (_typeof(data) === 'object' && data.resume) {fillAvatar(data);
    fillBrand(data);
    fillPersonal(data);
    fillSkill(data);
    fillLanguage(data);
    fillIntro(data);
    fillEducation(data);
    fillExperience(data);
    fillProject(data);
    highlight(data);
    fixResume(data.size, data.custom_width);
    setPrint();}
}

function getJSON(options) {if (!options.url) return;
  var request = new XMLHttpRequest();
  request.open('get', options.url);
  request.responseType = 'json';
  request.addEventListener('readystatechange', function () {if (request.readyState === 4 && request.status === 200 && request.response) {options.success && options.success(request.response);
    }
  });
  request.send();}

getJSON({
  url: 'data.json',
  success: generate
});

},{}]},{},[1]);
>>>>>>> c728d66bef1038018a91f5229f0ef8f72309e64f

/* SACRI 2027 : espace direction */
(function(){
"use strict";
var D=window.D,H=window.H,K=window.K,X=window.DIR,T=D.today,$=K.$,ic=K.ic,M=K.M,F=K.F,fr=K.fr,pl=K.pl,esc=K.esc,sum=K.sum;
var SOC={};D.socs.forEach(function(s){SOC[s]=D.par[s];});
function socsOf(s){return String(s).split(", ");}
function SF(){return K.S.soc;}
function inSF(str){var s=SF();return !s||str==="Groupe"||socsOf(str).indexOf(s)>=0;}
function col(v){return K.css(v);}
function legend(el,items){$(el).innerHTML=items.map(function(x){return '<span><i style="background:'+x[1]+'"></i>'+x[0]+"</span>";}).join("");}
function who(r){return '<span class="who">'+K.av(r)+esc(r)+"</span>";}
function socTags(s){return s==="Groupe"?K.stag("Groupe"):socsOf(s).map(K.stag).join("");}
var JC=["dim.","lun.","mar.","mer.","jeu.","ven.","sam."];
function jour(s){var d=K.dd(s);return JC[d.getDay()]+" "+fr(s);}
var VNAME={dg:"Directeur général",do:"Opérations",sujets:"Sujets de la direction",ecarts:"Écarts de procédure",veille:"Veille concurrents"};

/* ---------- état gardé sur l'appareil ---------- */
var KEY="sacri-direction-v3",ST={};
try{ST=JSON.parse(localStorage.getItem(KEY)||"{}");}catch(e){ST={};}
function save(){try{localStorage.setItem(KEY,JSON.stringify(ST));}catch(e){}}

/* ======================= DIRECTEUR GÉNÉRAL ======================= */
function actItem(a,kind){
  var done=ST[a.id];
  return '<div class="it"><span class="ty '+(done?"g":a.late?"late":"o")+'">'+ic(done?"circle-check-big":a.ico)+'</span><div style="min-width:0"><p class="tt">'+esc(a.titre)+'</p><p class="ds">'+esc(a.det)+'</p><p class="mm">'+who(a.resp)+socTags(a.soc)+"</p>"+
    (done?'<p class="done">'+ic("check")+esc(done)+" : enregistré et transmis au responsable</p>":'<div class="btns">'+a.acts.map(function(t,i){return '<button class="btn sm'+(i===0?" pri":"")+'" data-act="'+a.id+'" data-t="'+esc(t)+'">'+t+"</button>";}).join("")+"</div>")+
    '</div><div class="rr"><span class="pill '+(done?"g":a.late?"r":"o")+'">'+ic(done?"check":a.late?"clock":"hourglass")+(done?"Traité":esc(a.quand))+"</span></div></div>";}
function bindActs(root){[].forEach.call(root.querySelectorAll("[data-act]"),function(b){b.onclick=function(){ST[b.dataset.act]=b.dataset.t;save();renderAll();K.toast(b.dataset.t+" : transmis au responsable");};});}
function renderDG(){
  var s=SF(),per=K.S.per,f=K.fact(s),G=D.groupe,C=s?SOC[s]:G;
  K.fbar($("f-dg"),{});
  var dec=X.dg_dec.filter(function(a){return inSF(a.soc);}),left=dec.filter(function(a){return !ST[a.id];});
  var sous=D.socs.filter(function(x){return SOC[x].sous>0;});
  $("dg-lede").innerHTML=s?("<b>"+s+"</b> a facturé <b>"+M(f.v,2)+" M FCFA</b> "+K.PLAB[per]+". "+(C.sous>0?'<span class="r">Sa trésorerie passe sous son seuil de '+M(C.seuil,0)+" M dès la semaine du "+fr(C.sous_des)+".</span>":"Sa trésorerie reste au-dessus de son seuil sur 13 semaines.")+" "+(left.length?"<b>"+pl(left.length,"décision")+"</b> vous "+(left.length>1?"attendent":"attend")+".":"Aucune décision ne vous attend."))
    :("Le groupe a facturé <b>"+M(f.v)+" M FCFA</b> "+K.PLAB[per]+", dont "+Math.round(K.fact("SACRI").v/(f.v||1)*100)+" % par SACRI. La trésorerie tient sur 13 semaines, mais <b>"+sous.join(" et ")+" passent sous leur seuil</b> fin janvier. "+(left.length?"<b>"+pl(left.length,"décision")+"</b> vous "+(left.length>1?"attendent":"attend")+".":"Toutes les décisions du jour sont traitées."));
  var tr=D.treso[s||"Groupe"].fin,trh=[],L=s?[s]:D.socs;for(var i=0;i<53;i++)trh.push(sum(L.map(function(x){return H.tr_hist[x][i];})));
  var dev=s?C.devis:G.devis,devn=s?C.devis_n:G.devis_n;
  $("dg-kpis").innerHTML=
    K.kc({ico:"receipt",key:1,l:"Facturé "+K.PLAB[per].replace(" (au 19)",""),v:M(f.v,s?2:1),u:"M FCFA",sp:'<canvas id="sp-dg1"></canvas>',s:K.delta(K.pct(f.v,f.p),K.PPREV[per])})+
    K.kc({ico:"wallet",l:"Trésorerie disponible",v:M(C.treso),u:"M FCFA",sp:'<canvas id="sp-dg2"></canvas>',s:"<span>point bas <b>"+M(C.point_bas)+" M</b> le "+fr(C.point_bas_sem)+"</span>"})+
    K.kc({ico:"hand-coins",l:"Impayés à plus de 60 jours",v:M(C.imp60),u:"M FCFA",s:C.imp60?'<span class="pill r">'+ic("triangle-alert")+(s?"au dernier rappel":"7 factures au dernier rappel")+"</span>":'<span class="pill g">'+ic("shield-check")+"aucun</span>"})+
    K.kc({ico:"file-text",l:"Devis en cours",v:M(dev),u:"M FCFA",s:"<span>"+pl(devn,"devis","devis")+(s?"":", 58 % transformés")+"</span>"});
  K.spark("sp-dg1",K.factSeries(s).v,{bar:1,col:col("--acc")});K.spark("sp-dg2",trh.slice(K.wStart()),{col:col("--sky"),seuil:C.seuil,min:0});
  $("dg-cnt").textContent=left.length?pl(left.length,"décision restante","décisions restantes"):"Tout est traité";
  $("dg-dec").innerHTML=dec.length?dec.map(function(a){return actItem(a);}).join(""):'<p class="empty">Aucune décision pour '+s+" aujourd'hui.</p>";bindActs($("dg-dec"));
  /* trésorerie */
  var lab=["auj."].concat(D.semaines.slice(1).map(fr)),data=[C.treso].concat(tr.slice(1));
  $("dg-tr-t").textContent="Trésorerie sur 13 semaines"+(s?", "+s:", groupe");
  K.mk("c-dg-tr",{type:"line",data:{labels:lab,datasets:[{label:"Solde prévu",data:data,borderColor:col("--sky"),backgroundColor:function(c){return K.grad(c,col("--sky"),"30","02");},fill:true,tension:.35,borderWidth:2.2,pointRadius:0,pointHoverRadius:4},
    {label:"Seuil d'alerte",data:data.map(function(){return C.seuil;}),borderColor:col("--red"),borderDash:[5,4],borderWidth:1.4,pointRadius:0,fill:false}]},
    options:{maintainAspectRatio:false,interaction:{mode:"index",intersect:false},plugins:{tooltip:{callbacks:{label:function(c){return " "+c.dataset.label+" : "+M(c.raw,1)+" M FCFA";}}}},scales:{x:K.xC(),y:K.yM({min:0})}}});
  $("dg-tr-n").innerHTML=s?(C.sous>0?s+' descend à <b>'+M(C.point_bas)+" M</b> pour un seuil de "+M(C.seuil,0)+" M.":s+" reste au-dessus de son seuil de "+M(C.seuil,0)+" M."):"Le groupe reste au-dessus de son seuil de 38 M. Le creux vient de DEFI (6 M pour un seuil de 8 M) et de SAFIR (1,8 M pour 3 M).";
  /* anneau */
  var sh=D.socs.map(function(x){return K.fact(x).v;}),tot=sum(sh);
  $("dg-donut-u").textContent=K.PLAB[per];
  K.mk("c-dg-donut",{type:"doughnut",data:{labels:D.socs,datasets:[{data:sh,backgroundColor:D.socs.map(function(x){return K.SC[x]+(s&&s!==x?"40":"");}),borderColor:col("--card"),borderWidth:3,hoverOffset:6}]},
    options:{maintainAspectRatio:false,cutout:"70%",plugins:{tooltip:{callbacks:{label:function(c){return " "+c.label+" : "+M(c.raw,2)+" M ("+Math.round(c.raw/(tot||1)*100)+" %)";}}}},onClick:function(e,el){if(el.length){var x=D.socs[el[0].index];K.setSoc(SF()===x?null:x);}}},
    plugins:[K.center(M(s?K.fact(s).v:tot)+" M",s||"groupe")]});
  legend("lg-dg-donut",D.socs.map(function(x,i){return[x+" <b>"+Math.round(sh[i]/(tot||1)*100)+" %</b>",K.SC[x]];}));
  /* sujets et veille en bref */
  var hot=nonAbordes();
  $("dg-sujets").innerHTML='<div class="su-l">'+(hot.length?hot.slice(0,4).map(function(h){var rep=ST["rep-"+h.k];return '<div class="it"><span class="ic '+(rep?"g":"r")+'">'+ic(rep?"check":"circle-x")+'</span><div style="min-width:0"><p class="tt" style="font-weight:500;font-size:13.5px">'+esc(h.p.p)+'</p><p class="mm">'+h.r.titre+" du "+fr(h.r.date)+"</p></div>"+'<div class="rr"><span class="pill '+(rep?"g":"o")+'">'+(rep?"Repris":"Relance le "+fr(h.r.suivante))+"</span></div></div>";}).join(""):'<p class="empty">Tous les points attendus ont été abordés.</p>')+"</div>"+
    '<p class="note" style="padding-top:12px">'+pl(hot.length,"point non abordé","points non abordés")+" cette semaine : rappel envoyé en fin de réunion, relance inscrite à la réunion suivante.</p>";
  var vf=X.veille.faits.filter(function(v){return inSF(v.soc);});
  $("dg-veille-u").textContent="synthèse du mardi "+fr(X.veille.date);
  $("dg-veille").innerHTML='<div class="mini">'+(vf.length?vf.map(vfait).join(""):'<p class="empty">Aucun fait de veille pour '+s+" cette semaine.</p>")+"</div>";
  /* tableau */
  var rows=D.socs.map(function(x){var m=SOC[x];return{soc:x,m:m,fact:K.fact(x).v,treso:m.treso,pb:m.point_bas,enc:m.encours,imp:m.imp60};});
  var cols=[
    {k:"soc",l:"Société",num:false,html:function(r){return '<div class="sn">'+K.tile(r.soc)+'<div><p class="nm">'+r.soc+'</p><p class="mt">'+esc(r.m.metier)+"</p></div></div>";}},
    {k:"fact",l:"Facturé",num:1,dl:"Facturé",html:function(r){return M(r.fact,2)+" M";}},
    {k:"treso",l:"Trésorerie",num:1,dl:"Trésorerie",html:function(r){var mx=Math.max(r.treso,r.m.seuil)*1.25;return '<span class="pb"><span class="tr"><i class="'+(r.m.sous?"bad":"ok")+'" style="width:'+(r.treso/mx*100)+'%"></i><b style="left:'+(r.m.seuil/mx*100)+'%"></b></span>'+M(r.treso)+" M</span>";}},
    {k:"pb",l:"Point bas 13 sem.",num:1,dl:"Point bas",html:function(r){return '<span class="'+(r.m.sous?"bad":"")+'">'+M(r.pb)+" M</span>";}},
    {k:"enc",l:"Encours clients",num:1,dl:"Encours",cls:"hm",html:function(r){return M(r.enc)+" M";}},
    {k:"imp",l:"Impayés > 60 j",num:1,dl:"Impayés > 60 j",html:function(r){return '<span class="'+(r.imp?"bad":"zero")+'">'+(r.imp?M(r.imp)+" M":"0")+"</span>";}},
    {k:"etat",l:"État",num:false,dl:"État",cls:"wide",sort:function(r){return r.m.sous;},html:function(r){return r.m.sous?'<span class="pill r">'+ic("trending-down")+"Sous seuil le "+fr(r.m.sous_des)+"</span>":'<span class="pill g">'+ic("shield-check")+"Au-dessus du seuil</span>";}}];
  function draw(){K.table($("t-dg"),cols,rows,{cards:1,sortK:"fact",text:function(r){return r.soc+" "+r.m.metier;},rowAttr:function(r){return ' data-soc="'+r.soc+'" class="ck'+(SF()===r.soc?" on":"")+'"';},
    foot:'<tr><td class="l">Groupe</td><td class="num">'+M(K.fact(null).v)+' M</td><td class="num">'+M(G.treso)+' M</td><td class="num">'+M(G.point_bas)+' M</td><td class="num hm">'+M(G.encours)+' M</td><td class="num">'+M(G.imp60)+' M</td><td class="ra"></td></tr>',
    count:function(n){$("t-dg-n").textContent=pl(n,"société")+", facturé "+K.PLAB[per];},
    after:function(el){[].forEach.call(el.querySelectorAll("tr[data-soc]"),function(r){r.onclick=function(){K.setSoc(SF()===r.dataset.soc?null:r.dataset.soc);};});}});}
  draw();K.search($("q-dg"),$("t-dg"),draw);
}

/* ======================= OPÉRATIONS ======================= */
function opsWeekly(k,s){var L=s?[s]:D.socs,o=[];for(var i=0;i<53;i++)o.push(sum(L.map(function(x){return H.ops[x][k][i];})));return o;}
function renderDO(){
  var s=SF(),per=K.S.per,L=s?[s]:D.socs;
  K.fbar($("f-do"),{note:"La période règle l'historique."});
  var at=sum(L.map(function(x){return SOC[x].atelier;})),atr=sum(L.map(function(x){return SOC[x].atelier_ret;})),ru=sum(L.map(function(x){return SOC[x].rupt;})),ss=sum(L.map(function(x){return SOC[x].sousseuil;}));
  var imp=X.imports.filter(function(m){return inSF(m.socs);}),blo=imp.filter(function(m){return m.st[0]==="r";}).length;
  var acts=X.do_act.filter(function(a){return inSF(a.soc);}),left=acts.filter(function(a){return !ST[a.id];});
  var ah=opsWeekly("atelier",s),rh=opsWeekly("rupt",s),w0=K.wStart();
  $("do-lede").innerHTML="<b>"+pl(at,"machine")+"</b> à l'atelier"+(s?" chez "+s:"")+(atr?', dont <span class="r">'+atr+" en retard</span>":"")+". <b>"+pl(ru,"article")+" en rupture</b> et "+pl(imp.length,"envoi")+" en route ou en douane."+(s?"":" Au service client, <b>1 message</b> attend une réponse sur 21 reçus depuis lundi.");
  $("do-kpis").innerHTML=
    K.kc({ico:"wrench",key:1,l:"Machines à l'atelier",v:at,sp:'<canvas id="sp-do1"></canvas>',s:atr?'<span class="pill r">'+ic("clock")+"dont "+atr+" en retard</span>":'<span class="pill g">'+ic("shield-check")+"aucune en retard</span>"})+
    K.kc({ico:"package-x",l:"Articles en rupture",v:ru,sp:'<canvas id="sp-do2"></canvas>',s:"<span>et <b>"+ss+"</b> sous le seuil"+(s?"":", sur 40 suivis")+"</span>"})+
    K.kc({ico:"ship",l:"Envois en route ou en douane",v:imp.length,s:blo?'<span class="pill r">'+ic("triangle-alert")+"dont "+blo+" bloqué"+(blo>1?"s":"")+"</span>":'<span class="pill g">'+ic("shield-check")+"aucun bloqué</span>"})+
    K.kc({ico:"message-circle",l:"Première réponse aux clients",v:"4,0",u:"h",s:"<span><b>82 %</b> dans le délai visé"+(s?", groupe":"")+"</span>"});
  K.spark("sp-do1",ah.slice(w0),{col:col("--acc"),min:0});K.spark("sp-do2",rh.slice(w0),{bar:1,col:col("--vio")});
  $("do-cnt").textContent=left.length?pl(left.length,"action restante","actions restantes"):"Tout est traité";
  $("do-act").innerHTML=acts.length?acts.map(function(a){return actItem(a);}).join(""):'<p class="empty">Rien à traiter pour '+s+" aujourd'hui.</p>";bindActs($("do-act"));
  /* atelier par étape */
  var et=X.atelier_etapes,ec=["#94A3B8","#0EA5E9","#F59E0B","#E95B0F","#10B981"],AS=["SACRI","PST-CI"].filter(function(x){return !s||x===s;});
  $("do-at-u").textContent="machines par étape";
  K.mk("c-do-at",{type:"bar",data:{labels:AS.length?AS:[s],datasets:et.map(function(e,i){return{label:e,data:(AS.length?AS:[s]).map(function(x){return (X.atelier[x]||[0,0,0,0,0])[i];}),backgroundColor:ec[i],stack:"a",barThickness:26,borderRadius:4};})},
    options:{indexAxis:"y",maintainAspectRatio:false,interaction:{mode:"index",intersect:false},plugins:{tooltip:{callbacks:{label:function(c){return " "+c.dataset.label+" : "+c.raw;}}}},scales:{x:{stacked:true,grid:K.grid(),border:{display:false},ticks:{precision:0}},y:{stacked:true,grid:{display:false},border:{display:false},ticks:{font:{size:12.5,weight:"500"},color:col("--ink2")}}}}});
  legend("lg-do-at",et.map(function(e,i){return[e,ec[i]];}));
  /* historique */
  var n=53-w0,lab=[];for(var i=w0;i<53;i++)lab.push(fr(K.add(T,-7*(52-i))));
  $("do-hist-u").textContent="fin de semaine, "+K.PLAB[per];
  K.mk("c-do-hist",{type:"line",data:{labels:lab,datasets:[{label:"Machines à l'atelier",data:ah.slice(w0),borderColor:col("--acc"),backgroundColor:function(c){return K.grad(c,col("--acc"),"30","02");},fill:true,tension:.35,borderWidth:2,pointRadius:n<6?3:0},
    {label:"Articles en rupture",data:rh.slice(w0),borderColor:col("--vio"),borderWidth:2,tension:.35,pointRadius:n<6?3:0,fill:false}]},
    options:{maintainAspectRatio:false,interaction:{mode:"index",intersect:false},scales:{x:K.xC(),y:{min:0,grid:K.grid(),border:{display:false},ticks:{precision:0,maxTicksLimit:5}}}}});
  /* ruptures et importations */
  var rp=X.ruptures.filter(function(r){return inSF(r.soc);});
  $("do-rup-u").textContent=pl(rp.length,"article");
  $("do-rup").innerHTML=rp.length?rp.map(function(r){return '<div class="it"><span class="ty r">'+ic("package-x")+'</span><div style="min-width:0"><p class="tt">'+esc(r.des)+'</p><p class="mm">'+K.stag(r.soc)+"<span>"+r.conso+'</span></p></div><div class="rr"><span class="pill '+r.st[0]+'">'+r.st[1]+"</span></div></div>";}).join(""):'<p class="empty">Aucune rupture pour '+s+".</p>";
  var EL=["Commandé","Embarqué","Arrivé","Dédouané","Livré"];
  $("do-imp-u").textContent=pl(imp.length,"envoi");
  $("do-imp").innerHTML=imp.length?imp.map(function(m){return '<div class="it"><span class="ty '+(m.st[0]==="r"?"r":m.st[0]==="g"?"g":"b")+'">'+ic(m.mode==="Avion"?"send":"ship")+'</span><div style="min-width:0"><p class="tt">'+esc(m.four)+'</p><p class="mm"><span>'+m.mode+"</span>"+socTags(m.socs)+"<span>"+String(m.val).replace(".",",")+' M FCFA</span></p><div class="trk">'+EL.map(function(e,i){return '<i class="'+(i<m.etape?"on "+m.st[0]:"")+'"></i>';}).join("")+'</div><div class="trl">'+EL.map(function(e){return "<span>"+e+"</span>";}).join("")+'</div></div><div class="rr"><span class="pill '+m.st[0]+'">'+m.st[1]+"</span></div></div>";}).join(""):'<p class="empty">Aucun envoi pour '+s+".</p>";
}

/* ======================= SUJETS DE LA DIRECTION ======================= */
var SU={reu:"",st:""};
var RT={codir:{l:"Comité de direction",ico:"briefcase-business",c:"#0F172A"},com:{l:"Réunion commerciale",ico:"trending-up",c:"#E95B0F"},atelier:{l:"Point atelier",ico:"wrench",c:"#10B981"}};
function tenues(){return X.reunions.filter(function(r){return !r.prevue;});}
function pts(r){return r.points.filter(function(p){return inSF(p.soc);});}
function nonAbordes(){var o=[];tenues().forEach(function(r){pts(r).forEach(function(p,i){if(p.st==="non")o.push({r:r,p:p,k:r.id+"-"+i});});});return o;}
function stInfo(p){return p.st==="aborde"?["g","check","Abordé"]:p.st==="non"?["r","circle-x","Non abordé"]:p.st==="reporte"?["a","circle-pause","Reporté"]:["n","circle-dot","Prévu"];}
function renderSujets(){
  var s=SF();
  K.fbar($("f-sujets"),{per:false,extra:[
    {id:"reu",label:"Réunion",ico:"calendar-check",opts:[["","Toutes"],["codir","Comité de direction"],["com","Réunion commerciale"],["atelier","Point atelier"]],val:SU.reu,on:function(v){SU.reu=v;renderSujets();}},
    {id:"st",type:"seg",label:"Statut",ico:"list-filter",opts:[["","Tous"],["non","Non abordés"],["aborde","Abordés"]],val:SU.st,on:function(v){SU.st=v;renderSujets();}}]});
  var R=tenues().filter(function(r){return !SU.reu||r.type===SU.reu;});
  var all=[];R.forEach(function(r){pts(r).forEach(function(p){all.push(p);});});
  var ab=all.filter(function(p){return p.st==="aborde";}).length,no=all.filter(function(p){return p.st==="non";}).length,rp=all.filter(function(p){return p.st==="reporte";}).length;
  var hot=nonAbordes().filter(function(h){return !SU.reu||h.r.type===SU.reu;}),rep=hot.filter(function(h){return ST["rep-"+h.k];}).length;
  var decs=all.filter(function(p){return p.dec;}).length;
  $("su-lede").innerHTML="Semaine du 16 novembre : <b>"+pl(R.length,"réunion")+"</b>, "+pl(all.length,"point attendu","points attendus")+" par la direction"+(s?" pour "+s:"")+". <b>"+ab+" abordé"+(ab>1?"s":"")+"</b>, "+(no?'<span class="r">'+no+" non abordé"+(no>1?"s":"")+"</span>":"aucun oubli")+(rp?" et "+rp+" reporté":"")+". Chaque point oublié a fait l'objet d'un rappel en fin de réunion ; il est inscrit d'office à la réunion suivante.";
  $("su-kpis").innerHTML=
    K.kc({ico:"clipboard-check",key:1,l:"Points attendus",v:all.length,s:"<span>sur "+pl(R.length,"réunion")+" tenue"+(R.length>1?"s":"")+"</span>"})+
    K.kc({ico:"circle-check",l:"Abordés",v:all.length?Math.round(ab/all.length*100):0,u:"%",sp:'<canvas id="sp-su1"></canvas>',s:"<span><b>"+ab+"</b> sur "+all.length+", "+pl(decs,"décision prise","décisions prises")+"</span>"})+
    K.kc({ico:"alarm-clock",l:"Non abordés",v:no,s:no?'<span class="pill r">'+ic("bell")+"rappel envoyé en fin de réunion</span>":'<span class="pill g">'+ic("shield-check")+"rien d'oublié</span>"})+
    K.kc({ico:"repeat",l:"Relances inscrites",v:hot.length-rep,s:rep?'<span class="pill g">'+ic("check")+rep+" déjà repris</span>":"<span>à la prochaine réunion de chaque série</span>"});
  K.spark("sp-su1",X.hist_aborde.map(function(a,i){return Math.round(a/(a+X.hist_non[i])*100);}),{col:col("--grn"),min:0});
  /* non abordés en tête */
  $("su-hot-u").textContent=pl(hot.length,"point");
  $("su-hot").innerHTML=hot.length?hot.map(function(h){var done=ST["rep-"+h.k];
    return '<div class="hr"><span class="ty '+(done?"g":"r")+'">'+ic(done?"circle-check-big":"alarm-clock")+'</span><div style="min-width:0"><p class="tt" style="font:600 14px/1.35 var(--sans)">'+esc(h.p.p)+'</p><p class="ds" style="font:400 13px/1.5 var(--sans);color:var(--mut);margin-top:3px">'+h.r.titre+" du "+jour(h.r.date)+(h.p.motif?" · "+esc(h.p.motif):"")+'</p><div class="tl2"><span class="step ok">'+ic("send")+"Rappel envoyé en fin de réunion, "+fr(h.r.date)+'</span><span class="step ok">'+ic("user-check")+'Directeur général prévenu</span><span class="step '+(done?"ok":"nx")+'">'+ic(done?"check":"repeat")+(done?"Repris":"Relance prévue à la réunion du "+fr(h.r.suivante))+'</span></div><p class="mm" style="display:flex;gap:12px;flex-wrap:wrap;margin-top:9px;font:400 12.5px/1.2 var(--sans);color:var(--mut)">'+who(h.p.resp)+socTags(h.p.soc)+'</p></div><div class="rr" style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">'+(done?'<button class="btn sm ghost" data-unrep="'+h.k+'">'+ic("undo-2")+"Annuler</button>":'<button class="btn sm" data-rep="'+h.k+'">'+ic("check")+"Marquer repris</button>")+"</div></div>";}).join(""):'<p class="empty">Aucun point oublié'+(s?" pour "+s:"")+" cette semaine.</p>";
  [].forEach.call(document.querySelectorAll("[data-rep]"),function(b){b.onclick=function(){ST["rep-"+b.dataset.rep]=1;save();renderAll();K.toast("Point marqué comme repris");};});
  [].forEach.call(document.querySelectorAll("[data-unrep]"),function(b){b.onclick=function(){delete ST["rep-"+b.dataset.unrep];save();renderAll();};});
  /* historique */
  K.mk("c-su-hist",{type:"bar",data:{labels:X.hist_sem,datasets:[
    {label:"Abordés",data:X.hist_aborde,backgroundColor:col("--grn"),stack:"a",borderRadius:4,maxBarThickness:34},
    {label:"Non abordés ou reportés",data:X.hist_non,backgroundColor:col("--red"),stack:"a",borderRadius:4,maxBarThickness:34},
    {type:"line",label:"Repris la semaine suivante",data:X.hist_rattrape,borderColor:col("--ink"),backgroundColor:col("--ink"),borderWidth:1.6,pointRadius:3,tension:.3}]},
    options:{maintainAspectRatio:false,interaction:{mode:"index",intersect:false},scales:{x:K.xC({stacked:true}),y:{stacked:true,min:0,grid:K.grid(),border:{display:false},ticks:{precision:0,maxTicksLimit:5}}}}});
  /* jauges par réunion */
  var TR=tenues();
  $("su-gauges").innerHTML=TR.map(function(r){var P=pts(r),a=P.filter(function(p){return p.st==="aborde";}).length;return '<div class="gauge'+(SU.reu&&SU.reu!==r.type?" dim":"")+'"><div class="gc"><canvas id="g-'+r.id+'"></canvas><p class="gv">'+(P.length?Math.round(a/P.length*100):0)+'<small> %</small></p></div><p class="gn">'+RT[r.type].l+'</p><p class="gs">'+a+" sur "+P.length+", "+fr(r.date)+"</p></div>";}).join("");
  TR.forEach(function(r){var P=pts(r),a=P.filter(function(p){return p.st==="aborde";}).length,q=P.length?a/P.length:1;K.gauge("g-"+r.id,a,P.length||1,q>=1?col("--grn"):q>=2/3?col("--amb"):col("--red"));});
  /* réunions */
  $("su-reu").innerHTML=R.map(function(r){var P=pts(r).filter(function(p){return !SU.st||p.st===SU.st||(SU.st==="non"&&p.st==="reporte");});
    P.sort(function(a,b){var o={non:0,reporte:1,aborde:2};return o[a.st]-o[b.st];});
    var all2=pts(r),n={aborde:0,non:0,reporte:0};all2.forEach(function(p){n[p.st]++;});var d=K.dd(r.date);
    return '<div class="card reu"><div class="reu-h"><div class="dt"><b>'+d.getDate()+"</b><small>"+JC[d.getDay()].replace(".","")+'</small></div><div><p class="nm">'+r.titre+'</p><p class="sb"><span>'+ic("clock")+" "+r.heure+"</span><span>Animée par le "+r.anim.charAt(0).toLowerCase()+r.anim.slice(1)+"</span>"+socTags(r.soc)+'</p></div><div class="sc"><span class="bar5">'+(n.aborde?'<i style="width:'+n.aborde/all2.length*100+'%;background:var(--grn)"></i>':"")+(n.reporte?'<i style="width:'+n.reporte/all2.length*100+'%;background:var(--amb)"></i>':"")+(n.non?'<i style="width:'+n.non/all2.length*100+'%;background:var(--red)"></i>':"")+'</span><span class="pill '+(n.non?"r":"g")+'">'+n.aborde+" sur "+all2.length+" abordés</span></div></div>"+
      '<div class="pt hd"><span></span><span>Point attendu par la direction</span><span>Décision prise</span><span>Responsable</span><span style="text-align:right">Échéance</span></div>'+
      (P.length?P.map(function(p){var si=stInfo(p);return '<div class="pt'+(p.st==="non"?" no":"")+'"><span class="ic '+si[0]+'" title="'+si[2]+'">'+ic(si[1])+'</span><p class="p">'+esc(p.p)+"<small>"+si[2]+(p.motif?" · "+esc(p.motif):"")+'</small></p><p class="dc'+(p.dec?"":" no")+'">'+(p.dec?esc(p.dec):(p.st==="non"?"Non abordé : relance le "+fr(r.suivante):"Pas encore de décision"))+'</p><p class="rs">'+K.av(p.resp)+"<span>"+esc(p.resp)+'</span></p><p class="ec">'+(p.ech?fr(p.ech):"")+"</p></div>";}).join(""):'<p class="empty">Aucun point pour ce filtre.</p>')+"</div>";}).join("")||'<p class="empty card">Aucune réunion pour ce filtre.</p>';
  /* semaine prochaine */
  $("su-next").innerHTML=X.reunions.filter(function(r){return r.prevue&&(!SU.reu||r.type===SU.reu);}).map(function(r){var P=pts(r);return '<div class="card odj"><div class="card-h"><p class="t">'+ic(RT[r.type].ico)+r.titre+'</p><p class="u">'+jour(r.date)+", "+r.heure+"</p></div><ul>"+(P.length?P.map(function(p){return '<li class="'+(p.relance?"rl":"")+'">'+ic(p.relance?"repeat":"circle-dot")+"<span>"+esc(p.p)+"</span>"+(p.relance?'<span class="pill o">Relance</span>':"")+"</li>";}).join(""):'<li><span>Aucun point pour ce filtre.</span></li>')+"</ul></div>";}).join("");
  /* message de rappel */
  var r2=X.reunions[1],nn=r2.points.filter(function(p){return p.st==="non";}),rpt=r2.points.filter(function(p){return p.st==="reporte";});
  $("su-msg").innerHTML='<div class="mh"><span>De</span><b>Assistante de direction</b><span>À</span><b>Participants de la réunion commerciale</b><span>Copie</span><b>Directeur général</b><span>Objet</span><b>Réunion commerciale du '+jour(r2.date)+" : "+pl(nn.length,"point attendu","points attendus")+' non abordés</b></div>'+
    '<div class="mb"><p>Bonjour à tous,</p><p>Merci pour la réunion de ce matin. La direction attendait '+pl(r2.points.length,"point")+" ; "+pl(nn.length,"point n'a pas été abordé","points n'ont pas été abordés")+" :</p><ul>"+nn.map(function(p){return "<li><b>"+esc(p.p)+"</b> ("+esc(p.resp.charAt(0).toLowerCase()+p.resp.slice(1))+")</li>";}).join("")+"</ul>"+
    (rpt.length?"<p>Un point est reporté dans l'attente d'un avis : "+rpt.map(function(p){return esc(p.p.charAt(0).toLowerCase()+p.p.slice(1));}).join(", ")+".</p>":"")+
    "<p>Ils sont inscrits en tête de l'ordre du jour de la réunion du "+jour(r2.suivante)+". Merci aux responsables de venir avec les éléments.</p><p>Décisions prises ce matin :</p><ul>"+r2.points.filter(function(p){return p.dec;}).map(function(p){return "<li>"+esc(p.p)+" : "+esc(p.dec.charAt(0).toLowerCase()+p.dec.slice(1))+" ("+esc(p.resp.charAt(0).toLowerCase()+p.resp.slice(1))+", "+fr(p.ech)+")</li>";}).join("")+"</ul><p>Bonne journée,<br>L'assistante de direction</p></div>"+
    '<div class="mf"><button class="btn pri" id="msg-send">'+ic("send")+"Envoyer le rappel</button><button class=\"btn\" id=\"msg-copy\">"+ic("copy")+'Copier</button><span class="note-f">'+ic("info")+"Préparé en fin de réunion ; part après votre accord.</span></div>";
  $("msg-send").onclick=function(){K.toast("Démonstration : le rappel partirait aux participants");};
  $("msg-copy").onclick=function(){var t=$("su-msg").querySelector(".mb").innerText;try{navigator.clipboard.writeText(t);}catch(e){}K.toast("Message copié");};
}

/* ======================= ÉCARTS DE PROCÉDURE ======================= */
var EC={svc:"",niv:""};
var NIV={faible:{l:"Faible",c:"#94A3B8",p:"n",w:1},moyen:{l:"Moyen",c:"#F59E0B",p:"a",w:2},fort:{l:"Fort",c:"#EF4444",p:"r",w:3}},NK=["faible","moyen","fort"];
var ALL=null;
function allEcarts(){if(ALL)return ALL;var S=X.services,so=D.socs;
  ALL=X.anc.map(function(a){return{d:"2026-"+("0"+(a[0]+1)).slice(-2)+"-15",svc:S[a[1]],soc:so[a[2]],niv:NK[a[3]],old:1};}).concat(X.ecarts);return ALL;}
function renderEcarts(){
  var s=SF(),per=K.S.per,w=K.win(per),a0=per==="an"?"2026-01-01":w.a;
  K.fbar($("f-ecarts"),{extra:[
    {id:"svc",label:"Service",ico:"users",opts:[["","Tous"]].concat(X.services.map(function(x){return[x,x];})),val:EC.svc,on:function(v){EC.svc=v;renderEcarts();}},
    {id:"niv",type:"seg",label:"Gravité",ico:"siren",opts:[["","Toutes"],["fort","Forts"],["moyen","Moyens"],["faible","Faibles"]],val:EC.niv,on:function(v){EC.niv=v;renderEcarts();}}],note:"La période règle le registre ; le cumul porte sur l'année."});
  var A=allEcarts().filter(function(e){return (!s||e.soc===s)&&(!EC.svc||e.svc===EC.svc);}),AN=A.filter(function(e){return !EC.niv||e.niv===EC.niv;});
  var P=AN.filter(function(e){return e.d>=a0&&e.d<=T;}),PP=per==="an"?[]:AN.filter(function(e){return e.d>=w.pa&&e.d<=w.pb;});
  var reg=X.ecarts.filter(function(e){return (!s||e.soc===s)&&(!EC.svc||e.svc===EC.svc)&&(!EC.niv||e.niv===EC.niv)&&e.d>=(per==="an"||per==="tri"?"2026-01-01":a0);});
  var fo=P.filter(function(e){return e.niv==="fort";}).length,su=X.ecarts.filter(function(e){return (!s||e.soc===s)&&(!EC.svc||e.svc===EC.svc)&&e.st==="suivi";}).length;
  var bySvc={};X.services.forEach(function(x){bySvc[x]=0;});AN.forEach(function(e){bySvc[e.svc]++;});var top=X.services.slice().sort(function(a,b){return bySvc[b]-bySvc[a];})[0];
  $("ec-lede").innerHTML="<b>"+pl(P.length,"écart relevé","écarts relevés")+"</b> "+K.PLAB[per]+(s?" chez "+s:"")+(fo?', dont <span class="r">'+pl(fo,"fort","forts")+"</span>":"")+". Depuis janvier : <b>"+pl(AN.length,"écart")+"</b>"+(EC.svc?"":", le service le plus concerné est "+top.toLowerCase().replace("magasin et achats","le magasin et les achats").replace(/^(commercial|atelier|transit)$/,function(m){return (m==="atelier"?"l'":"le ")+m;}).replace(/^service client$/,"le service client").replace(/^finance$/,"la finance")+" ("+bySvc[top]+")")+". Chaque écart est noté par poste, jamais par nom, et alimente l'évaluation de fin d'année.";
  var mo=X.cumul_mois.map(function(_,m){return AN.filter(function(e){return +e.d.slice(5,7)===m+1;}).length;});
  $("ec-kpis").innerHTML=
    K.kc({ico:"shield-alert",key:1,l:per==="an"?"Écarts depuis janvier":"Écarts "+K.PLAB[per].replace(" (au 19)",""),v:P.length,sp:'<canvas id="sp-ec1"></canvas>',s:per==="an"?"<span>depuis le 1<sup>er</sup> janvier</span>":K.delta(K.pct(P.length,PP.length),K.PPREV[per],true)})+
    K.kc({ico:"siren",l:"Écarts forts",v:fo,s:fo?'<span class="pill r">'+ic("triangle-alert")+"sécurité, signature, remise</span>":'<span class="pill g">'+ic("shield-check")+"aucun</span>"})+
    K.kc({ico:"eye",l:"En suivi",v:su,s:"<span>suite en cours, à clore</span>"})+
    K.kc({ico:"book-check",l:"Cumul de l'année",v:AN.length,s:"<span>pour l'évaluation de fin d'année</span>"});
  K.spark("sp-ec1",mo,{bar:1,col:col("--acc")});
  /* carte de chaleur */
  var SV=EC.svc?[EC.svc]:X.services;
  $("ec-mx").innerHTML="<thead><tr><th></th>"+X.cumul_mois.map(function(m){return "<th>"+m+"</th>";}).join("")+"<th>Total</th></tr></thead><tbody>"+SV.map(function(sv){var tot=0;
    return '<tr><td class="rh"><span>'+sv+"</span></td>"+X.cumul_mois.map(function(_,m){var n=AN.filter(function(e){return e.svc===sv&&+e.d.slice(5,7)===m+1;}).length;tot+=n;return '<td class="'+(n===0?"z":n===1?"l1":n===2?"l2":"l3")+'" title="'+sv+", "+X.cumul_mois[m]+" : "+n+'">'+n+"</td>";}).join("")+'<td class="z" style="font-weight:700;color:var(--ink)">'+tot+"</td></tr>";}).join("")+"</tbody>";
  /* cumul par gravité */
  K.mk("c-ec-grav",{type:"bar",data:{labels:SV,datasets:NK.map(function(k){return{label:NIV[k].l,data:SV.map(function(sv){return A.filter(function(e){return e.svc===sv&&e.niv===k;}).length;}),backgroundColor:NIV[k].c+(EC.niv&&EC.niv!==k?"40":""),stack:"a",barThickness:18,borderRadius:3};})},
    options:{indexAxis:"y",maintainAspectRatio:false,interaction:{mode:"index",intersect:false},scales:{x:{stacked:true,grid:K.grid(),border:{display:false},ticks:{precision:0}},y:{stacked:true,grid:{display:false},border:{display:false},ticks:{font:{size:12.5,weight:"500"},color:col("--ink2")}}}}});
  /* cumul mois après mois */
  var cl=["#E95B0F","#0EA5E9","#10B981","#8B5CF6","#F59E0B","#64748B"];
  $("ec-cum-u").textContent=EC.svc||"par service";
  K.mk("c-ec-cum",{type:"line",data:{labels:X.cumul_mois,datasets:SV.map(function(sv){var c=0,i=X.services.indexOf(sv);return{label:sv,data:X.cumul_mois.map(function(_,m){c+=AN.filter(function(e){return e.svc===sv&&+e.d.slice(5,7)===m+1;}).length;return c;}),borderColor:cl[i],backgroundColor:cl[i],borderWidth:2,pointRadius:0,pointHoverRadius:4,tension:.3};})},
    options:{maintainAspectRatio:false,interaction:{mode:"index",intersect:false},plugins:{legend:{display:false}},scales:{x:K.xC(),y:{min:0,grid:K.grid(),border:{display:false},ticks:{precision:0,maxTicksLimit:5}}}}});
  legend("lg-ec-cum",SV.map(function(sv){return[sv,cl[X.services.indexOf(sv)]];}));
  /* évaluation */
  var ev=X.services.filter(function(sv){return !EC.svc||sv===EC.svc;}).map(function(sv){var e=A.filter(function(x){return x.svc===sv;}),n={faible:0,moyen:0,fort:0};e.forEach(function(x){n[x.niv]++;});
    var r3=e.filter(function(x){return x.d>="2026-09-01";}).length,p3=e.filter(function(x){return x.d>="2026-06-01"&&x.d<"2026-09-01";}).length;
    var pr={};X.ecarts.filter(function(x){return x.svc===sv&&(!s||x.soc===s);}).forEach(function(x){pr[x.proc]=(pr[x.proc]||0)+1;});var tp=Object.keys(pr).sort(function(a,b){return pr[b]-pr[a];})[0];
    return{svc:sv,tot:e.length,f:n.faible,m:n.moyen,fo:n.fort,pond:n.faible+2*n.moyen+3*n.fort,tr:r3-p3,proc:tp||"",col:cl[X.services.indexOf(sv)]};});
  var mx=Math.max.apply(null,ev.map(function(r){return r.pond;}).concat([1]));
  K.table($("t-ec-eval"),[
    {k:"svc",l:"Service",num:false,html:function(r){return '<div class="sn"><span class="ti" style="background:'+r.col+'1A;color:'+r.col+'">'+ic("users")+'</span><div><p class="nm">'+r.svc+'</p><p class="mt">'+(r.proc?"Surtout : "+esc(r.proc.charAt(0).toLowerCase()+r.proc.slice(1)):"")+"</p></div></div>";}},
    {k:"tot",l:"Écarts de l'année",num:1,dl:"Écarts",html:function(r){return "<b>"+r.tot+"</b>";}},
    {k:"f",l:"Faibles",num:1,dl:"Faibles",cls:"hm",html:function(r){return r.f;}},
    {k:"m",l:"Moyens",num:1,dl:"Moyens",cls:"hm",html:function(r){return r.m;}},
    {k:"fo",l:"Forts",num:1,dl:"Forts",html:function(r){return '<span class="'+(r.fo?"bad":"zero")+'">'+r.fo+"</span>";}},
    {k:"pond",l:"Score pondéré",num:1,dl:"Score pondéré",html:function(r){return '<span class="pb"><span class="tr"><i class="'+(r.pond/mx>.7?"bad":"")+'" style="width:'+(r.pond/mx*100)+'%"></i></span>'+r.pond+"</span>";}},
    {k:"tr",l:"Tendance",num:false,dl:"Tendance",cls:"wide",html:function(r){return r.tr>0?'<span class="pill r">'+ic("trending-up")+"En hausse ("+(r.tr>0?"+":"")+r.tr+")</span>":r.tr<0?'<span class="pill g">'+ic("trending-down")+"En baisse ("+r.tr+")</span>":'<span class="pill n">Stable</span>';}}],ev,{cards:1,sortK:"pond"});
  /* registre */
  var cols=[
    {k:"d",l:"Date",num:false,dl:"Date",html:function(r){return fr(r.d);}},
    {k:"svc",l:"Service",num:false,dl:"Service",html:function(r){return esc(r.svc)+'<span class="sub">'+esc(r.poste)+"</span>";}},
    {k:"proc",l:"Procédure",num:false,dl:"Procédure",cls:"wrap",html:function(r){return esc(r.proc)+'<span class="sub">'+K.dot(r.soc)+" "+r.soc+"</span>";}},
    {k:"ecart",l:"Écart constaté",num:false,dl:"Écart",cls:"wrap",html:function(r){return esc(r.ecart);}},
    {k:"suite",l:"Suite donnée",num:false,dl:"Suite",cls:"wrap",html:function(r){return esc(r.suite);}},
    {k:"niv",l:"Gravité",num:false,dl:"Gravité",sort:function(r){return NIV[r.niv].w;},html:function(r){return '<span class="pill '+NIV[r.niv].p+'">'+NIV[r.niv].l+"</span>";}},
    {k:"st",l:"État",num:false,dl:"État",html:function(r){return r.st==="clos"?'<span class="pill g">'+ic("check")+"Clos</span>":'<span class="pill b">'+ic("eye")+"En suivi</span>";}}];
  function draw(){K.table($("t-ec"),cols,reg,{cards:1,sortK:"d",text:function(r){return [r.svc,r.poste,r.proc,r.ecart,r.suite,r.soc].join(" ");},count:function(n){$("t-ec-n").textContent=pl(n,"écart")+" au registre"+(per==="an"||per==="tri"?", octobre et novembre":", "+K.PLAB[per]);}});}
  draw();K.search($("q-ec"),$("t-ec"),draw);
}

/* ======================= VEILLE ======================= */
var VE={imp:"",mode:(location.hash.indexOf("semaine")>0?"sem":"tri")};
var IMP={haut:{l:"Fort",p:"r",c:"#EF4444"},moyen:{l:"Moyen",p:"a",c:"#F59E0B"},bas:{l:"Faible",p:"n",c:"#94A3B8"}};
var VCAT={"Offre":{ico:"megaphone",c:"#E95B0F"},"Réseau":{ico:"map-pin",c:"#0EA5E9"},"Service":{ico:"wrench",c:"#10B981"},"Salon":{ico:"store",c:"#8B5CF6"}};
function vfait(v){var c=VCAT[v.cat];return '<div class="vf"><p class="d">'+jour(v.d).split(" ")[0]+"<small>"+fr(v.d)+'</small></p><div style="min-width:0"><p class="q"><span class="pill '+IMP[v.impact].p+'">Impact '+IMP[v.impact].l.toLowerCase()+'</span><span class="stag" style="color:'+c.c+'">'+ic(c.ico)+v.cat+"</span>"+socTags(v.soc)+'</p><p class="f"><b>'+esc(v.qui)+"</b> : "+esc(v.fait)+'</p><p class="s">'+ic("arrow-right")+esc(v.suite)+"</p></div></div>";}
function renderVMode(){
  $("ve-mode").innerHTML='<div class="seg big" role="group" aria-label="Période de la veille"><button data-vm="tri" class="'+(VE.mode==="tri"?"on":"")+'">'+ic("calendar-range")+'Trimestre</button><button data-vm="sem" class="'+(VE.mode==="sem"?"on":"")+'">'+ic("calendar-days")+"Semaine</button></div>";
  [].forEach.call($("ve-mode").querySelectorAll("[data-vm]"),function(b){b.onclick=function(){VE.mode=b.dataset.vm;if(history.replaceState)history.replaceState(null,"","#veille"+(VE.mode==="sem"?"-semaine":""));renderVeille();K.hydrate($("v-veille"));};});
  $("ve-q").style.display=VE.mode==="tri"?"":"none";$("ve-w").style.display=VE.mode==="sem"?"":"none";}
function renderVeilleQ(){
  var s=SF(),Q=X.veille_t3,F=Q.f.filter(function(f){return inSF(f[4]);});
  K.fbar($("f-veille"),{per:false,note:s?"Les faits concernant tout le groupe restent affichés.":""});
  $("ve-lede").innerHTML="Ce que les concurrents ont fait de juillet à septembre, et ce que nous avons décidé en face. Les concurrents sont désignés par leur type.";
  var mo=[7,8,9].map(function(m){return F.filter(function(f){return f[0]===m;}).length;}),fo=F.filter(function(f){return f[3]===2;}),t2=s?null:sum(Q.t2.faits),t2f=sum(Q.t2.fort);
  var dv=t2?Math.round((F.length-t2)/t2*100):null;
  $("vq-verdict").innerHTML=s?"<b>"+pl(F.length,"fait")+"</b> pour "+s:'<b>'+(dv>=0?"+":"")+dv+' %</b> de faits relevés par rapport au 2<sup>e</sup> trimestre, avec un pic en septembre (salon SIREXE).';
  $("vq-kpis").innerHTML=
    K.kc({ico:"newspaper",key:1,l:"Faits relevés",v:F.length,sp:'<canvas id="sp-vq"></canvas>',s:t2?'<span class="dl nt">'+ic("arrow-up")+"+"+dv+" %</span><span>contre "+t2+" au 2<sup>e</sup> trimestre</span>":"<span>juillet à septembre</span>"})+
    K.kc({ico:"siren",l:"Faits à fort impact",v:fo.length,s:'<span class="pill r">'+ic("triangle-alert")+(s?"pour "+s:"contre "+t2f+'<em class="hm3">&nbsp;au 2<sup>e</sup> trimestre</em>')+"</span>"})+
    K.kc({ico:"gavel",l:"Décisions prises au comité",v:Q.decisions,s:'<span class="pill g">'+ic("circle-check")+'sur 6<em class="hm3">&nbsp;faits à fort impact</em></span><span>tout le groupe</span>'});
  K.spark("sp-vq",mo,{bar:1,col:col("--acc")});
  $("vq-mv").innerHTML=Q.mouvements.map(function(m,i){var dim=s&&m.soc!==s;
    return '<div class="card mv'+(dim?" dim":"")+'"><div class="mv-top"><span class="mv-ic" style="background:'+m.c+'1A;color:'+m.c+'">'+ic(m.ico)+'</span><span class="mv-n">'+(i+1)+'</span><span class="mv-m">'+m.mois+'</span></div>'+
      '<p class="mv-tag"><span class="stag" style="color:'+m.c+'">'+m.sujet+"</span>"+K.stag(m.soc)+'</p><p class="mv-who">'+esc(m.type)+'</p><p class="mv-f">'+esc(m.fait)+"</p>"+
      '<div class="mv-b"><p class="mv-l r">'+ic("siren")+'<span><small>Impact</small>'+esc(m.impact)+'</span></p><p class="mv-l g">'+ic("arrow-right")+'<span><small>Suite donnée</small>'+esc(m.suite)+"</span></p></div></div>";}).join("");
  /* carte de chaleur types x sujets */
  var cl=function(n){return n===0?"z":n===1?"l1":n<=3?"l2":"l3";};
  $("vq-mx").innerHTML="<thead><tr><th></th>"+Q.sujets.map(function(u){return "<th>"+ic(u[1])+u[0]+"</th>";}).join("")+"<th>Total</th></tr></thead><tbody>"+Q.types.map(function(t,ti){var tot=0;
    return '<tr><td class="rh"><span>'+ic(t[2])+'<em class="lg">'+t[0]+'</em><em class="sm">'+t[1]+"</em></span></td>"+Q.sujets.map(function(u,si){var n=F.filter(function(f){return f[1]===ti&&f[2]===si;}).length;tot+=n;return '<td class="'+cl(n)+'" title="'+t[0]+", "+u[0].toLowerCase()+" : "+n+'">'+n+"</td>";}).join("")+'<td class="z tot">'+tot+"</td></tr>";}).join("")+"</tbody>";
  /* courbe par mois */
  var lab=Q.t2.mois.concat(["juil.","août","sept."]),fm=[7,8,9].map(function(m){return F.filter(function(f){return f[0]===m&&f[3]===2;}).length;});
  K.mk("c-vq",{type:"line",data:{labels:lab,datasets:[
    {label:"2e trimestre",data:s?[null,null,null,null,null,null]:Q.t2.faits.concat([null,null,null]),borderColor:"#CBD5E1",backgroundColor:"#CBD5E1",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#CBD5E1",tension:.35,spanGaps:false},
    {label:"3e trimestre",data:[null,null,s?null:Q.t2.faits[2]].concat(mo),borderColor:"#E95B0F",backgroundColor:"rgba(233,91,15,.10)",fill:true,borderWidth:3,pointRadius:[0,0,0,5,5,6],pointBackgroundColor:"#E95B0F",tension:.35},
    {label:"Dont impact fort",data:(s?[null,null,null]:Q.t2.fort).concat(fm),borderColor:"#EF4444",backgroundColor:"#EF4444",borderWidth:2,borderDash:[5,4],pointRadius:3,tension:.35}]},
    options:{maintainAspectRatio:false,interaction:{mode:"index",intersect:false},plugins:{tooltip:{filter:function(i){return i.raw!==null&&!(i.datasetIndex===1&&i.dataIndex===2);}}},scales:{x:K.xC(),y:{min:0,grid:K.grid(),border:{display:false},ticks:{precision:0,maxTicksLimit:5}}}}});
  $("vq-rep").innerHTML=Q.reponses.map(function(r){var dim=s&&r.soc!==s;return '<div class="row qr'+(dim?" dim":"")+'" style="cursor:default"><span class="ty '+r.st[0]+'">'+ic(r.ico)+'</span><div style="min-width:0"><p class="qr-t">'+esc(r.t)+'</p><p class="qr-s">'+K.stag(r.soc)+"<span>"+esc(r.d)+'</span></p></div><span class="pill '+r.st[0]+'">'+ic(r.st[1])+r.st[2]+"</span></div>";}).join("");
}
function renderVeille(){
  renderVMode();
  if(VE.mode==="tri"){renderVeilleQ();return;}
  var s=SF(),V=X.veille;
  K.fbar($("f-veille"),{per:false,extra:[{id:"imp",type:"seg",label:"Impact",ico:"siren",opts:[["","Tous"],["haut","Fort"],["moyen","Moyen"],["bas","Faible"]],val:VE.imp,on:function(v){VE.imp=v;renderVeille();}}]});
  var F0=V.faits.filter(function(v){return inSF(v.soc);}),F1=F0.filter(function(v){return !VE.imp||v.impact===VE.imp;});
  var hi=F0.filter(function(v){return v.impact==="haut";}).length,so={};F0.forEach(function(v){socsOf(v.soc).forEach(function(x){so[x]=1;});});
  $("ve-lede").innerHTML="Synthèse du mardi "+fr(V.date)+", "+V.semaine+" : <b>"+pl(F0.length,"fait daté","faits datés")+"</b>"+(s?" concernant "+s:"")+(hi?', dont <span class="r">'+pl(hi,"à fort impact","à fort impact")+"</span>":"")+". Les concurrents sont désignés par leur type. Chaque fait propose une suite à donner.";
  var tot8=sum(X.veille_hist.haut)+sum(X.veille_hist.moyen)+sum(X.veille_hist.bas);
  $("ve-kpis").innerHTML=
    K.kc({ico:"newspaper",key:1,l:"Faits de la semaine",v:F0.length,sp:'<canvas id="sp-ve"></canvas>',s:"<span>"+tot8+" sur 8 semaines</span>"})+
    K.kc({ico:"siren",l:"Impact fort",v:hi,s:hi?'<span class="pill r">'+ic("triangle-alert")+"à décider au comité</span>":'<span class="pill g">'+ic("shield-check")+"aucun</span>"})+
    K.kc({ico:"building-2",l:"Sociétés concernées",v:Object.keys(so).filter(function(x){return x!=="Groupe";}).length,s:"<span>"+(Object.keys(so).filter(function(x){return x!=="Groupe";}).join(", ")||"aucune")+(so.Groupe?", plus un fait pour tout le groupe":"")+"</span>"})+
    K.kc({ico:"calendar-clock",l:"Prochaine synthèse",v:"24/11",s:"<span>mardi, avant le comité</span>"});
  K.spark("sp-ve",X.veille_hist.sem.map(function(_,i){return X.veille_hist.haut[i]+X.veille_hist.moyen[i]+X.veille_hist.bas[i];}),{bar:1,col:col("--acc")});
  $("ve-syn-u").textContent=fr(V.date)+", "+pl(F1.length,"fait");
  $("ve-faits").innerHTML=F1.length?F1.map(vfait).join(""):'<p class="empty">Aucun fait pour ce filtre.</p>';
  var cats=Object.keys(VCAT),cv=cats.map(function(c){return F1.filter(function(v){return v.cat===c;}).length;});
  K.mk("c-ve",{type:"doughnut",data:{labels:cats,datasets:[{data:cv,backgroundColor:cats.map(function(c){return VCAT[c].c;}),borderColor:col("--card"),borderWidth:3}]},options:{maintainAspectRatio:false,cutout:"66%"},plugins:[K.center(String(sum(cv)),sum(cv)>1?"faits":"fait")]});
  legend("lg-ve",cats.map(function(c,i){return[c+" <b>"+cv[i]+"</b>",VCAT[c].c];}));
  $("ve-src").innerHTML="Sources suivies : "+V.sources.join(", ").toLowerCase().replace("salon sirexe","salon SIREXE")+".";
  K.mk("c-ve-h",{type:"bar",data:{labels:X.veille_hist.sem,datasets:["haut","moyen","bas"].map(function(k){return{label:"Impact "+IMP[k].l.toLowerCase(),data:X.veille_hist[k],backgroundColor:IMP[k].c+(VE.imp&&VE.imp!==k?"40":""),stack:"a",borderRadius:3,maxBarThickness:34};})},
    options:{maintainAspectRatio:false,interaction:{mode:"index",intersect:false},scales:{x:K.xC({stacked:true}),y:{stacked:true,min:0,grid:K.grid(),border:{display:false},ticks:{precision:0,maxTicksLimit:5}}}}});
}

/* ======================= NAVIGATION ======================= */
var CUR="dg",VIEWS=["dg","do","sujets","ecarts","veille"];
function badges(){
  var dg=X.dg_dec.filter(function(a){return inSF(a.soc)&&!ST[a.id];}).length,dO=X.do_act.filter(function(a){return inSF(a.soc)&&!ST[a.id];}).length,su=nonAbordes().filter(function(h){return !ST["rep-"+h.k];}).length;
  var ec=X.ecarts.filter(function(e){return e.st==="suivi"&&(!SF()||e.soc===SF());}).length,ve=X.veille.faits.filter(function(v){return inSF(v.soc);}).length;
  $("k-dg").textContent=dg||"";$("k-do").textContent=dO||"";$("k-su").textContent=su||"";$("k-ec").textContent=ec||"";$("k-ve").textContent=ve||"";
  $("m-dg").textContent=dg||"";$("m-do").textContent=dO||"";$("m-su").textContent=su||"";}
function render(v){({dg:renderDG,do:renderDO,sujets:renderSujets,ecarts:renderEcarts,veille:renderVeille})[v]();K.hydrate($("v-"+v));}
function show(v){CUR=v;
  [].forEach.call(document.querySelectorAll(".ni[data-v],.tabbar button"),function(b){b.classList.toggle("on",b.dataset.v===v);});
  [].forEach.call(document.querySelectorAll(".view"),function(s){s.classList.toggle("on",s.id==="v-"+v);});
  $("crumb-v").textContent=VNAME[v];
  if(history.replaceState)history.replaceState(null,"","#"+v+(v==="veille"&&VE.mode==="sem"?"-semaine":""));
  render(v);window.scrollTo({top:0});}
function renderAll(){badges();render(CUR);}
K.rerender=renderAll;
[].forEach.call(document.querySelectorAll(".ni[data-v],.tabbar button"),function(b){b.onclick=function(){show(b.dataset.v);};});
document.addEventListener("click",function(e){var g=e.target.closest&&e.target.closest("[data-goto]");if(g)show(g.dataset.goto);});
K.hydrate();
K.initTheme();
$("date").textContent=K.flong(T)+" 2026, 11 h";
var h0=(location.hash||"").slice(1).replace("-semaine","");
badges();
show(VIEWS.indexOf(h0)>=0?h0:"dg");
window.__dir={show:show,K:K};
})();

,55334,89681,8478,e=>{
  var t=e.i(43476),a=e.i(1063);
  let r={
    stroke:a.s,strokeWidth:3.4,strokeLinejoin:"round",strokeLinecap:"round"
  }
  ,s={
    ...r,fill:"none"
  }
  ;
  function i({
    part:e,d:r,len:n,fill:o,transform:l,opacity:d
  }
  ){
    return(0,t.jsxs)("g",{
      "data-p":e,transform:l,opacity:d,children:[(0,t.jsx)("path",{
        d:`${
          r
        }
        Z`,fill:o
      }
      ),(0,t.jsx)("path",{
        d:r,...s
      }
      ),(0,t.jsx)("path",{
        d:(0,a.T)(n),...s,strokeWidth:2.4
      }
      )]
    }
    )
  }
  function n(){
    return(0,t.jsxs)(t.Fragment,{
      children:[(0,t.jsx)("ellipse",{
        cx:194,cy:a.e,rx:7.4,ry:8.6,fill:a.s
      }
      ),(0,t.jsx)("ellipse",{
        cx:230,cy:a.e,rx:7.4,ry:8.6,fill:a.s
      }
      ),(0,t.jsx)("circle",{
        cx:196.6,cy:a.e-3.4,r:2.7,fill:"#fff"
      }
      ),(0,t.jsx)("circle",{
        cx:232.6,cy:a.e-3.4,r:2.7,fill:"#fff"
      }
      ),(0,t.jsx)("circle",{
        cx:192,cy:a.e+3.2,r:1.2,fill:"#fff"
      }
      ),(0,t.jsx)("circle",{
        cx:228,cy:a.e+3.2,r:1.2,fill:"#fff"
      }
      )]
    }
    )
  }
  e.s(["f",0,function({
    pose:e="sit",facing:o="right",className:l,label:d,style:c
  }
  ){
    let h=a.o[e],f=(0,a.F)(h),u="left"===o?`translate(${
      a.W
    }
     0) scale(-1 1)`:void 0;
    return(0,t.jsx)("svg",{
      viewBox:`0 0 ${
        a.W
      }
       ${
        a.R
      }
      `,className:l,style:{
        overflow:"visible",...c
      }
      ,role:d?"img":void 0,"aria-label":d,"aria-hidden":!d||void 0,focusable:"false",children:(0,t.jsxs)("g",{
        "data-p":"root",transform:u,children:[(0,t.jsx)("ellipse",{
          "data-p":"shadow",...a.p.shadow,fill:a.s,opacity:f.shadowOpacity,transform:f.shadow,style:{
            transformBox:"fill-box",transformOrigin:"center"
          }
          
        }
        ),(0,t.jsxs)("g",{
          "data-p":"body",transform:f.body,opacity:f.side,children:[(0,t.jsx)(i,{
            part:"bf",d:a.a.backFar,len:a.x-192,fill:a.Q,transform:f.bf,opacity:f.backLegs
          }
          ),(0,t.jsx)(i,{
            part:"ff",d:a.a.frontFar,len:a.x-192,fill:a.Q,transform:f.ff
          }
          ),(0,t.jsxs)("g",{
            "data-p":"tail",transform:f.tail,children:[(0,t.jsx)("path",{
              d:a.p.tailStem,...s,strokeWidth:9
            }
            ),(0,t.jsx)("path",{
              d:a.p.tailStem,stroke:a.O,strokeWidth:4,fill:"none",strokeLinecap:"round"
            }
            ),(0,t.jsx)("path",{
              d:a.p.tail,fill:a.O,...r
            }
            )]
          }
          ),(0,t.jsx)(i,{
            part:"bn",d:a.a.back,len:a.x-194,fill:a.O,transform:f.bn,opacity:f.backLegs
          }
          ),(0,t.jsx)("path",{
            d:a.p.body,fill:a.O,...r
          }
          ),(0,t.jsx)("path",{
            d:a.p.chest,fill:a.O,...r
          }
          ),(0,t.jsx)(i,{
            part:"fn",d:a.a.front,len:a.x-194,fill:a.O,transform:f.fn
          }
          )]
        }
        ),(0,t.jsxs)("g",{
          "data-p":"haunch",opacity:f.haunchOpacity,transform:f.haunch,children:[(0,t.jsx)("path",{
            d:a.p.haunch,fill:a.O,...r
          }
          ),(0,t.jsx)("path",{
            d:a.p.haunchPaw,fill:a.O,...r
          }
          ),(0,t.jsx)("path",{
            d:"M132 222v5M139 222v5",...s,strokeWidth:2.4
          }
          )]
        }
        ),(0,t.jsxs)("g",{
          "data-p":"head",transform:f.head,children:[(0,t.jsx)("path",{
            d:a.p.collar,fill:a.N,...r,strokeWidth:3
          }
          ),(0,t.jsx)("path",{
            d:a.p.tag,fill:a.l,...r,strokeWidth:2.4
          }
          ),(0,t.jsx)("path",{
            "data-p":"earL",d:a.p.earL,fill:a.Q,...r,transform:f.earL
          }
          ),(0,t.jsx)("path",{
            "data-p":"earR",d:a.p.earR,fill:a.Q,...r,transform:f.earR
          }
          ),(0,t.jsx)("path",{
            d:a.p.head,fill:a.O,...r
          }
          ),(0,t.jsx)("path",{
            d:a.p.topknot,fill:a.O,...r,strokeWidth:3
          }
          ),(0,t.jsx)("path",{
            d:a.p.muzzle,fill:a.l
          }
          ),(0,t.jsx)("circle",{
            cx:181,cy:116,r:7,fill:a.u,opacity:.85
          }
          ),(0,t.jsx)("circle",{
            cx:243,cy:116,r:7,fill:a.u,opacity:.85
          }
          ),(0,t.jsx)("g",{
            "data-p":"eyes",transform:f.eyes,children:(0,t.jsx)("g",{
              "data-p":"open",opacity:f.openEyes,children:(0,t.jsx)("g",{
                "data-p":"blink",transform:f.blink,children:(0,t.jsx)(n,{
                  
                }
                )
              }
              )
            }
            )
          }
          ),(0,t.jsx)("path",{
            "data-p":"happy",d:"M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101",...s,opacity:f.happyEyes
          }
          ),(0,t.jsx)("path",{
            "data-p":"shut",d:"M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97",...s,opacity:f.shutEyes
          }
          ),(0,t.jsx)("path",{
            d:a.p.nose,fill:a.s
          }
          ),(0,t.jsx)("path",{
            d:a.p.mouth,...s,strokeWidth:3
          }
          ),(0,t.jsx)("path",{
            "data-p":"tongue",d:a.p.tongue,fill:"#e98c8c",stroke:a.s,strokeWidth:2.2,strokeLinejoin:"round",opacity:f.tongue
          }
          ),(0,t.jsxs)("g",{
            "data-p":"mouth",opacity:f.mouth,children:[(0,t.jsx)("path",{
              d:a.p.mouthOpen,fill:"#6b2a1c",...r,strokeWidth:2.6
            }
            ),(0,t.jsx)("path",{
              d:"M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z",fill:"#e98c8c"
            }
            )]
          }
          )]
        }
        ),(0,t.jsxs)("g",{
          "data-p":"ledge",opacity:f.ledge,children:[(0,t.jsx)("path",{
            d:a.p.ledgePaws,fill:a.O,...r
          }
          ),(0,t.jsx)("path",{
            d:a.p.ledgeToes,...s,strokeWidth:2.4
          }
          )]
        }
        )]
      }
      )
    }
    )
  }
  ],55334);
  let o=[["root","transform","root"],["shadow","transform","shadow"],["shadow","opacity","shadowOpacity"],["body","transform","body"],["body","opacity","side"],["bf","transform","bf"],["bf","opacity","backLegs"],["bn","transform","bn"],["bn","opacity","backLegs"],["ff","transform","ff"],["fn","transform","fn"],["tail","transform","tail"],["haunch","transform","haunch"],["haunch","opacity","haunchOpacity"],["head","transform","head"],["earL","transform","earL"],["earR","transform","earR"],["eyes","transform","eyes"],["open","opacity","openEyes"],["blink","transform","blink"],["happy","opacity","happyEyes"],["shut","opacity","shutEyes"],["tongue","opacity","tongue"],["mouth","opacity","mouth"],["ledge","opacity","ledge"]],l=(e,t)=>1-Math.exp(-e/t),d=(e,t=-1,a=1)=>Math.max(t,Math.min(a,e));
  e.s(["f",0,class{
    svg;
    els;
    written;
    pose;
    target;
    m;
    facing;
    facingTarget;
    strideTarget;
    wagTarget;
    gazeTarget;
    tilt;
    tiltTarget;
    earV;
    nextBlink;
    blinkAt;
    woofUntil;
    bounce;
    bounceV;
    offset;
    offsetTarget;
    pet;
    petTarget;
    turn;
    lean;
    constructor(e,t="sit",r=1){
      this.svg=e,this.els=new Map,this.written=new Map,this.m={
        ...a.t
      }
      ,this.strideTarget=0,this.wagTarget=.35,this.gazeTarget={
        x:0,y:0
      }
      ,this.tilt=0,this.tiltTarget=0,this.earV=0,this.nextBlink=1.2,this.blinkAt=-1,this.woofUntil=0,this.bounce=0,this.bounceV=0,this.offset=0,this.offsetTarget=0,this.pet=0,this.petTarget=0,this.turn=.07,this.lean=0,e.querySelectorAll("[data-p]").forEach(e=>this.els.set(e.dataset.p,e)),this.pose={
        ...a.o[t]
      }
      ,this.target=this.pose,this.facing=r,this.facingTarget=r
    }
    setPose(e){
      this.target="string"==typeof e?a.o[e]:e
    }
    jump(e,t){
      this.pose={
        ...a.o[e]
      }
      ,this.target=a.o[e],t&&(this.facing=this.facingTarget=t)
    }
    face(e,t=.07){
      this.facingTarget=e,this.turn=t
    }
    get facingDir(){
      return this.facingTarget
    }
    stride(e){
      this.strideTarget=d(e,0,1)
    }
    advance(e){
      this.m.phase+=e/46*Math.PI
    }
    walkedTo(e){
      this.m.phase=e/46*Math.PI
    }
    wag(e){
      this.wagTarget=d(e,0,1)
    }
    cock(e){
      this.tiltTarget=e
    }
    lookAt(e){
      if(!e){
        this.gazeTarget={
          x:0,y:0
        }
        ;
        return
      }
      let t=this.svg.getBoundingClientRect(),r=this.facingTarget>0?a.M[0]:a.W-a.M[0],s=t.left+r/a.W*t.width,i=t.top+a.e/a.R*t.height,n=e.x-s,o=e.y-i,l=Math.hypot(n,o)||1,d=Math.min(1,l/160);
      this.gazeTarget={
        x:n/l*d*this.facingTarget,y:o/l*d
      }
      
    }
    woof(e){
      this.woofUntil=e+.34,this.bounceV=-150,this.earV+=260
    }
    jolt(e=1){
      this.earV+=220*e
    }
    hop(e=1){
      this.bounceV=-230*e,this.earV+=200*e
    }
    yawn(e,t=.9){
      this.woofUntil=e+t
    }
    dash(e){
      this.offsetTarget=e
    }
    petting(e){
      this.petTarget=+!!e
    }
    reset(){
      this.offsetTarget=0,this.tiltTarget=0,this.petTarget=0
    }
    tick(e,t){
      e=Math.min(e,.05);
      let r=this.m;
      r.time=t,this.pose=(0,a.n)(this.pose,this.target,l(e,.16)),this.facing+=(this.facingTarget-this.facing)*l(e,this.turn),r.stride+=(this.strideTarget-r.stride)*l(e,.12),r.stride<.012&&0===this.strideTarget&&(r.stride=0),r.wag+=(this.wagTarget-r.wag)*l(e,.4),r.gazeX+=(this.gazeTarget.x-r.gazeX)*l(e,.07),r.gazeY+=(this.gazeTarget.y-r.gazeY)*l(e,.07),this.tilt+=(this.tiltTarget+3*r.gazeX-this.tilt)*l(e,.18),this.earV+=(-150*r.ear-10*this.earV)*e,r.ear=d(r.ear+this.earV*e,-28,28),this.bounceV+=(-260*this.bounce-16*this.bounceV)*e,this.bounce+=this.bounceV*e;
      let s=this.offset;
      this.offset+=(this.offsetTarget-this.offset)*l(e,.2),.05>Math.abs(this.offsetTarget-this.offset)&&(this.offset=this.offsetTarget);
      let i=Math.abs(this.offset-s);
      i&&this.advance(i);
      let n=e>0?Math.min(1,i/e/180):0;
      this.pet+=(this.petTarget-this.pet)*l(e,.15),t>this.nextBlink&&this.pose.eyes>.6&&(this.blinkAt=t,this.nextBlink=t+2.2+3.8*Math.random(),.18>Math.random()&&(this.nextBlink=t+.32));
      let c=(t-this.blinkAt)/.15;
      r.blink=c>=0&&c<=1?Math.sin(c*Math.PI):0;
      let h={
        ...this.pose,headRot:this.pose.headRot+this.tilt,bodyRot:this.pose.bodyRot+this.lean,bodyY:this.pose.bodyY+this.bounce,headY:this.pose.headY+1.15*this.bounce,mouth:t<this.woofUntil?1:this.pose.mouth,happy:Math.max(this.pose.happy,this.pet)
      }
      ,f=(0,a.F)(h,n>r.stride?{
        ...r,stride:n
      }
      :r),u=.02>Math.abs(this.facing)?.02*Math.sign(this.facing||1):this.facing,p={
        root:`translate(${
          this.offset.toFixed(1)
        }
         0) translate(${
          a.W/2
        }
         0) scale(${
          u.toFixed(3)
        }
         1) translate(${
          -a.W/2
        }
         0)`
      }
      ;
      for(let[e,t,a]of o){
        let r=this.els.get(e);
        if(!r)continue;
        let s="root"===a?p.root:String(f[a]),i=`${
          e
        }
        :${
          t
        }
        `;
        this.written.get(i)!==s&&(r.setAttribute(t,s),this.written.set(i,s))
      }
      
    }
    
  }
  ],89681);
  let c=e=>1===e?-1:1,h=["woof","spin","beg","bow","hop","love","tilt","sneeze"],f=[];
  e.s(["M",0,{
    woof:({
      d:e,say:t
    }
    ,a)=>[[a,a=>(e.woof(a),t("woof!"))],[a+.42,a=>(e.woof(a),t("woof woof!"))]],spin:({
      d:e,rest:t,facing:a,say:r
    }
    ,s)=>[[s,()=>(e.setPose("stand"),e.hop(.5))],[s+.14,()=>e.face(c(a))],[s+.38,()=>e.face(a)],[s+.62,()=>e.face(c(a))],[s+.86,()=>(e.face(a),r("wheee!"))],[s+1.3,()=>e.setPose(t)]],beg:({
      d:e,rest:t,say:a
    }
    ,r)=>[[r,()=>(e.setPose("beg"),e.wag(1),a("treat, please?",1.7))],[r+1.9,()=>(e.setPose(t),e.wag(.7))]],bow:({
      d:e,rest:t,say:a
    }
    ,r)=>[[r,()=>(e.setPose("bow"),e.wag(1),a("play with me!"))],[r+.55,()=>e.hop(.45)],[r+1.7,()=>(e.setPose(t),e.wag(.7))]],hop:({
      d:e,rest:t,say:a
    }
    ,r)=>[[r,()=>(e.setPose("hop"),e.hop(1.1),a("boing!"))],[r+.36,()=>e.setPose(t)],[r+.62,()=>(e.setPose("hop"),e.hop(.8))],[r+.98,()=>e.setPose(t)]],love:({
      d:e,rest:t,say:a,hearts:r
    }
    ,s)=>[[s,()=>(e.setPose({
      ...t,happy:1,tongue:1
    }
    ),e.wag(1),r(),a("I like you!",1.5))],[s+1.9,()=>(e.setPose(t),e.wag(.7))]],tilt:({
      d:e,say:t
    }
    ,a)=>[[a,()=>(e.cock(-14),t("hm?"))],[a+.8,()=>e.cock(12)],[a+1.6,()=>e.cock(0)]],sneeze:({
      d:e,say:t
    }
    ,a)=>[[a,()=>e.cock(-8)],[a+.32,a=>(e.cock(10),e.jolt(1.4),e.hop(.35),e.yawn(a,.22),t("achoo!"))],[a+.8,()=>e.cock(0)]],zoomies:({
      d:e,rest:t,facing:a,say:r
    }
    ,s)=>[[s,()=>(e.setPose("walk"),e.wag(1),r("zoomies!",2))],[s+.05,()=>(e.face(1),e.dash(70))],[s+.5,()=>(e.face(-1),e.dash(-70))],[s+.98,()=>(e.face(1),e.dash(50))],[s+1.4,()=>(e.face(-1),e.dash(-30))],[s+1.78,()=>(e.face(1),e.dash(0))],[s+2.25,()=>(e.face(a),e.setPose(t),e.wag(.7))]],peekaboo:({
      d:e,say:t
    }
    ,r)=>[[r,()=>e.setPose({
      ...a.o.peek,headY:120
    }
    )],[r+.55,()=>(e.setPose("peek"),e.jolt(1.2),t("peekaboo!"))]],wake:({
      d:e,rest:t,say:r
    }
    ,s)=>[[s,t=>(e.setPose("settle"),e.yawn(t,.9),r("*yaaawn*"))],[s+1.25,()=>(e.setPose({
      ...a.o.settle,happy:1
    }
    ),e.wag(.8),r("five more minutes…",1.6))],[s+3.1,()=>(e.setPose(t),e.wag(0),r("zzz",2))]]
  }
  ,"m",0,function(e,t,a){
    for(let r=0;
    r<5;
    r++){
      let s=document.createElement("span");
      s.className="pup-heart",s.textContent="♥",s.style.left=`${
        t
      }
      px`,s.style.top=`${
        a
      }
      px`,e.append(s);
      let i=(Math.random()-.5)*90,n=-70-60*Math.random();
      s.animate([{
        transform:"translate(-50%, 0) scale(0.4)",opacity:0
      }
      ,{
        opacity:1,offset:.2
      }
      ,{
        transform:`translate(calc(-50% + ${
          i.toFixed(0)
        }
        px), ${
          n.toFixed(0)
        }
        px) scale(1.1)`,opacity:0
      }
      ],{
        duration:1150+110*r,delay:80*r,easing:"cubic-bezier(.2,.7,.3,1)",fill:"backwards"
      }
      ).finished.then(()=>s.remove(),()=>s.remove())
    }
    
  }
  ,"u",0,function(e,t){
    return t>=4?"zoomies":(f.length||(f=h.filter(t=>t!==e).sort(()=>Math.random()-.5)),f.pop())
  }
  ],8478)
}

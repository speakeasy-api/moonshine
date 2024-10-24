import{j as c}from"./jsx-runtime-DEdD30eg.js";import{r as o}from"./index-RYns6xqu.js";import{c as W}from"./utils-BxgJwFa2.js";function _(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function L(...e){return n=>e.forEach(r=>_(r,n))}var P=o.forwardRef((e,n)=>{const{children:r,...t}=e,s=o.Children.toArray(r),a=s.find($);if(a){const l=a.props.children,d=s.map(p=>p===a?o.Children.count(l)>1?o.Children.only(null):o.isValidElement(l)?l.props.children:null:p);return c.jsx(O,{...t,ref:n,children:o.isValidElement(l)?o.cloneElement(l,void 0,d):null})}return c.jsx(O,{...t,ref:n,children:r})});P.displayName="Slot";var O=o.forwardRef((e,n)=>{const{children:r,...t}=e;if(o.isValidElement(r)){const s=G(r);return o.cloneElement(r,{...F(t,r.props),ref:n?L(n,s):s})}return o.Children.count(r)>1?o.Children.only(null):null});O.displayName="SlotClone";var H=({children:e})=>c.jsx(c.Fragment,{children:e});function $(e){return o.isValidElement(e)&&e.type===H}function F(e,n){const r={...n};for(const t in n){const s=e[t],a=n[t];/^on[A-Z]/.test(t)?s&&a?r[t]=(...d)=>{a(...d),s(...d)}:s&&(r[t]=s):t==="style"?r[t]={...s,...a}:t==="className"&&(r[t]=[s,a].filter(Boolean).join(" "))}return{...e,...r}}function G(e){let n=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,r=n&&"isReactWarning"in n&&n.isReactWarning;return r?e.ref:(n=Object.getOwnPropertyDescriptor(e,"ref")?.get,r=n&&"isReactWarning"in n&&n.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}function z(e){var n,r,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(r=z(e[n]))&&(t&&(t+=" "),t+=r);else for(n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function K(){for(var e,n,r=0,t="";r<arguments.length;)(e=arguments[r++])&&(n=z(e))&&(t&&(t+=" "),t+=n);return t}const N=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,R=K,Z=(e,n)=>r=>{var t;if(n?.variants==null)return R(e,r?.class,r?.className);const{variants:s,defaultVariants:a}=n,l=Object.keys(s).map(u=>{const m=r?.[u],g=a?.[u];if(m===null)return null;const f=N(m)||N(g);return s[u][f]}),d=r&&Object.entries(r).reduce((u,m)=>{let[g,f]=m;return f===void 0||(u[g]=f),u},{}),p=n==null||(t=n.compoundVariants)===null||t===void 0?void 0:t.reduce((u,m)=>{let{class:g,className:f,...B}=m;return Object.entries(B).every(I=>{let[E,D]=I;return Array.isArray(D)?D.includes({...a,...d}[E]):{...a,...d}[E]===D})?[...u,g,f]:u},[]);return R(e,l,p,r?.class,r?.className)},q=Z("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),k=o.forwardRef(({className:e,variant:n,size:r,asChild:t=!1,...s},a)=>{const l=t?P:"button";return c.jsx(l,{className:W(q({variant:n,size:r,className:e})),ref:a,...s})});k.displayName="Button";k.__docgenInfo={description:"",methods:[],displayName:"Button",props:{asChild:{defaultValue:{value:"false",computed:!1},required:!1}}};function M(e,n){if(e==null)return{};var r={},t=Object.keys(e),s,a;for(a=0;a<t.length;a++)s=t[a],!(n.indexOf(s)>=0)&&(r[s]=e[s]);return r}var T=["color"],U=o.forwardRef(function(e,n){var r=e.color,t=r===void 0?"currentColor":r,s=M(e,T);return o.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},s,{ref:n}),o.createElement("path",{d:"M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z",fill:t,fillRule:"evenodd",clipRule:"evenodd"}))});const Y={component:k,tags:["autodocs"]},i={args:{children:"Button",variant:"default"}},v={args:{...i.args,variant:"destructive"}},h={args:{...i.args,variant:"secondary"}},y={args:{...i.args,variant:"ghost"}},x={args:{...i.args,variant:"link"}},b={args:{...i.args,variant:"outline"}},C={args:{...i.args,children:c.jsxs(c.Fragment,{children:[c.jsx(A,{}),"Button"]})}},j={args:{...i.args,size:"sm"}},S={args:{...i.args,size:"lg"}};function A(e){return c.jsx(U,{...e})}const w={args:{...i.args,size:"icon",children:c.jsx(A,{})}},V={args:{...i.args,asChild:!0,children:c.jsx("a",{href:"#",children:"Link"})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Button',
    variant: 'default'
  }
}`,...i.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'destructive'
  }
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'secondary'
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'ghost'
  }
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'link'
  }
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'outline'
  }
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: <>
        <PlusIcon />
        Button
      </>
  }
}`,...C.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'sm'
  }
}`,...j.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'lg'
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'icon',
    children: <PlusIcon />
  }
}`,...w.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    asChild: true,
    children: <a href="#">Link</a>
  }
}`,...V.parameters?.docs?.source}}};const ee=["Default","Destructive","Secondary","Ghost","Link","Outline","WithIcon","Small","Large","IconOnly","AsChild"];export{V as AsChild,i as Default,v as Destructive,y as Ghost,w as IconOnly,S as Large,x as Link,b as Outline,h as Secondary,j as Small,C as WithIcon,ee as __namedExportsOrder,Y as default};

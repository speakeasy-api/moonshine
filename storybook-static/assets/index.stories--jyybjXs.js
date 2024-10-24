import{j as i}from"./jsx-runtime-DEdD30eg.js";import{c as o,g as r}from"./utils-BxgJwFa2.js";import{c}from"./storybookUtils-BIaX15u6.js";import"./index-RYns6xqu.js";const p=a=>`grid-cols-${a}`,d=a=>`gap-${a}`;function s({children:a,columns:m=1,gap:u=0}){return i.jsx("div",{className:o("grid",r(m,p),r(u,d)),children:a})}s.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{required:!1,tsType:{name:"union",raw:"T | { [key in Breakpoints]?: T }",elements:[{name:"Exclude",elements:[{name:"unknown"},{name:"literal",value:"0"}],raw:"Exclude<Range<typeof maxGridColumns>, 0>"},{name:"signature",type:"object",raw:"{ [key in Breakpoints]?: T }",signature:{properties:[{key:{name:"union",raw:"'sm' | 'md' | 'lg' | 'xl' | '2xl'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"},{name:"literal",value:"'2xl'"}],required:!1},value:{name:"Exclude",elements:[{name:"unknown"},{name:"literal",value:"0"}],raw:"Exclude<Range<typeof maxGridColumns>, 0>"}}]}}]},description:"",defaultValue:{value:"1",computed:!1}},gap:{required:!1,tsType:{name:"union",raw:"T | { [key in Breakpoints]?: T }",elements:[{name:"union",raw:"0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16",elements:[{name:"literal",value:"0"},{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"},{name:"literal",value:"5"},{name:"literal",value:"6"},{name:"literal",value:"8"},{name:"literal",value:"10"},{name:"literal",value:"12"},{name:"literal",value:"16"}]},{name:"signature",type:"object",raw:"{ [key in Breakpoints]?: T }",signature:{properties:[{key:{name:"union",raw:"'sm' | 'md' | 'lg' | 'xl' | '2xl'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"},{name:"literal",value:"'2xl'"}],required:!1},value:{name:"union",raw:"0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16",elements:[{name:"literal",value:"0"},{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"},{name:"literal",value:"5"},{name:"literal",value:"6"},{name:"literal",value:"8"},{name:"literal",value:"10"},{name:"literal",value:"12"},{name:"literal",value:"16"}]}}]}}]},description:"",defaultValue:{value:"0",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const y={component:s,tags:["autodocs"]},t=6,e={args:{children:c(t),columns:t}},l={args:{...e.args,gap:10}},n={args:{...e.args,columns:{sm:1,md:2,lg:3}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    children: createSampleChildren(columnCount),
    columns: columnCount
  }
}`,...e.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    gap: 10
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    columns: {
      sm: 1,
      md: 2,
      lg: 3
    }
  }
}`,...n.parameters?.docs?.source}}};const w=["Default","WithCustomGap","WithResponsiveColumns"];export{e as Default,l as WithCustomGap,n as WithResponsiveColumns,w as __namedExportsOrder,y as default};

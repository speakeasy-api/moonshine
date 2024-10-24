import{j as u}from"./jsx-runtime-DEdD30eg.js";import{c,g as t}from"./utils-BxgJwFa2.js";import{c as p}from"./storybookUtils-BIaX15u6.js";import"./index-RYns6xqu.js";const d={row:"flex-row",column:"flex-col"},g=a=>d[a],v=a=>`gap-${a}`;function o({children:a,direction:i="column",gap:m=0}){return u.jsx("div",{className:c("flex",t(i,g),t(m,v)),children:a})}o.__docgenInfo={description:"",methods:[],displayName:"Stack",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},direction:{required:!1,tsType:{name:"union",raw:"T | { [key in Breakpoints]?: T }",elements:[{name:"union",raw:"'row' | 'column'",elements:[{name:"literal",value:"'row'"},{name:"literal",value:"'column'"}]},{name:"signature",type:"object",raw:"{ [key in Breakpoints]?: T }",signature:{properties:[{key:{name:"union",raw:"'sm' | 'md' | 'lg' | 'xl' | '2xl'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"},{name:"literal",value:"'2xl'"}],required:!1},value:{name:"union",raw:"'row' | 'column'",elements:[{name:"literal",value:"'row'"},{name:"literal",value:"'column'"}]}}]}}]},description:"",defaultValue:{value:"'column'",computed:!1}},gap:{required:!1,tsType:{name:"union",raw:"T | { [key in Breakpoints]?: T }",elements:[{name:"union",raw:"0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16",elements:[{name:"literal",value:"0"},{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"},{name:"literal",value:"5"},{name:"literal",value:"6"},{name:"literal",value:"8"},{name:"literal",value:"10"},{name:"literal",value:"12"},{name:"literal",value:"16"}]},{name:"signature",type:"object",raw:"{ [key in Breakpoints]?: T }",signature:{properties:[{key:{name:"union",raw:"'sm' | 'md' | 'lg' | 'xl' | '2xl'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"},{name:"literal",value:"'2xl'"}],required:!1},value:{name:"union",raw:"0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16",elements:[{name:"literal",value:"0"},{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"},{name:"literal",value:"5"},{name:"literal",value:"6"},{name:"literal",value:"8"},{name:"literal",value:"10"},{name:"literal",value:"12"},{name:"literal",value:"16"}]}}]}}]},description:"",defaultValue:{value:"0",computed:!1}}}};const y={component:o,tags:["autodocs"]},e={args:{children:p(3),gap:0}},r={args:{...e.args,gap:5}},l={args:{...e.args,direction:"row"}},n={args:{...e.args,direction:{sm:"column",md:"row"}}},s={args:{...e.args,gap:{sm:2,md:5,lg:10,xl:12}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    children: createSampleChildren(3),
    gap: 0
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    gap: 5
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    direction: 'row'
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    direction: {
      sm: 'column',
      md: 'row'
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    gap: {
      sm: 2,
      md: 5,
      lg: 10,
      xl: 12
    }
  }
}`,...s.parameters?.docs?.source}}};const R=["Default","WithCustomGap","RowDirection","ResponsiveDirection","ResponsiveGap"];export{e as Default,n as ResponsiveDirection,s as ResponsiveGap,l as RowDirection,r as WithCustomGap,R as __namedExportsOrder,y as default};

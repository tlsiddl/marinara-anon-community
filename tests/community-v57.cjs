const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const box={console,document:{readyState:'loading',addEventListener(){}},window:{setTimeout,clearTimeout},marinara:{onCleanup(){}}};
vm.createContext(box);
vm.runInContext(fs.readFileSync('extension.js','utf8').replace(/\}\)\(\);\s*$/,'globalThis.t={state,normalizeState,parseRpTime};})();'),box);
const t=box.t;t.state.data=t.normalizeState({schemaVersion:2,settings:{rpTimeFormat:'time-first'}});
function date(s,y,m,d,h,min){let n=t.parseRpTime(s);assert.notEqual(n,null,s);let x=new Date(n);assert.deepEqual([x.getFullYear(),x.getMonth()+1,x.getDate(),x.getHours(),x.getMinutes()],[y,m,d,h,min],s)}
date('<tracker> ⏱️ 09:48 AM | Oct 31, Saturday, 2026, Modern | Seoul Arts Center → … </tracker>',2026,10,31,9,48);
date('<tracker> ⏳ 09:49 AM | 2026-10-31, Saturday, 2026 | Seoul </tracker>',2026,10,31,9,49);
date('12:01 PM | February 29, 2024 | Seoul',2024,2,29,12,1);
date('12:01 AM | 2024-02-29 | Seoul',2024,2,29,0,1);
date('2024-10-23 15:40',2024,10,23,15,40);
assert.equal(t.parseRpTime('09:48 AM | Feb 30, 2026 | Seoul'),null);
assert.equal(t.parseRpTime('13:48 PM | 2026-10-31 | Seoul'),null);
assert.equal(t.parseRpTime('09:48 AM | Seoul | 2026-10-31'),null);
t.state.data=t.normalizeState({schemaVersion:2,settings:{}});assert.equal(t.state.data.settings.rpTimeFormat,'default');assert.equal(t.parseRpTime('09:48 AM | Oct 31, 2026'),null);
console.log('PASS: configurable time-first dates, English months, validation, fallback and defaults');

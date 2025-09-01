//MDN:Proxy创建一个代理，拦截和重定义对象的基本操作。
//1.什么是基本操作？
//对象的操作（obj.a = 1 delete obj.a）都会转换成对对象的基本操作
// [[Delete]] [[Set]] [[Get]] [[Has]] [[OwnPropertyKeys]] [[GetOwnPropertyDescriptor]]

// [[GetPrototypeOf]]	getPrototypeOf()
// [[SetPrototypeOf]]	setPrototypeOf()
// [[IsExtensible]]	isExtensible()
// [[PreventExtensions]]	preventExtensions()
// [[GetOwnProperty]]	getOwnPropertyDescriptor()
// [[DefineOwnProperty]]	defineProperty()
// [[HasProperty]]	has()
// [[Get]]	get()
// [[Set]]	set()
// [[Delete]]	deleteProperty()
// [[OwnPropertyKeys]]	ownKeys()
// [[prototype]]

// 2.Proxy和defineProperty的区别？
// 本质区别：Proxy是拦截和重定义对象的基本操作，defineProperty只是众多基本操作之一，他们俩讲道理不应该放在一起比较，不是一个层面的东西

//3.vue2和vue3的区别
// vue2使用defineProperty来实现响应式，vue3使用Proxy来实现响应式
//defineProperty => 对应的基本操作是[[DefineOwnProperty]]，重新定义属性描述符，属性描述符里其中一个功能就是能够拦截现有属性的读写，很多东西拦截不到，
//（比如拦截数组的length都不行），拦截有缺陷，，有些东西它拦截不到，只能让你手动的去触发。比如($set、$get)
//vue2中用数组的push的时候，原来直接调数组原型上的push，但是拦截不到，所以在vue2中用数组的push和数组的原型的原型链上夹了一层，重写了数组的push方法，实现了拦截。

// 而Proxy可以拦截对象的所有操作，全面无死角。
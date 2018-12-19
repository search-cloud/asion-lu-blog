---
title: 三言两语@Java 数组
date: 2017-03-21 22:17:16
categories: [Java, Core]
tags: [Java, Array]
---

## 数组

在Java中，数组存储可以存储对象的原始值（int，char，long，...）或引用类型（也可称为指针）。
使用“new”创建对象时，会在Heap中分配一个内存空间并返回一个引用。对于数组也是如此，因为数组是Java中的对象。

**1. 单维数组**

```
int a1[ ] = new int[3];
int a2[ ] = new int[ ]{3, 6, 7, 4, 9};
```

int [] a1 只是3个整数数组的引用。如果创建一个包含10个整数的数组，则它是相同的 - 分配一个数组并返回一个引用。

![一维数组内存](https://upload-images.jianshu.io/upload_images/1753960-8f26e87e538d5758.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**2. 二维数组**

二维数组怎么样？实际上，我们只能在Java中使用一维数组。二维数组只是一维数组的数组。

```
int[ ][ ] arr = new int[3][ ];
arr[0] = new int[3];
arr[1] = new int[5];
arr[2] = new int[4];
```

![二维数组内存情况](https://upload-images.jianshu.io/upload_images/1753960-992a756d9053264d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


多维数组与二维数组是同样的道理。

**3. 数组位于Java内存中的哪个位置？**

数组也是Java中的对象，因此对象在内存中如何存储，数组也是一样的形式，只是数组分配了一个连续的内存，用来存储相同类型数据。

我们知道[JVM运行时数据区](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5)包括：Heap（堆），JVM Stacks（JVM栈），Native Method Stacks（本地方法栈）等。对于如下的简单示例，让我们看看数组与对象及其引用的存储位置。

```
class A {
	int x;
	int y;
}
 
...
 
public void m1() {
	int i = 0;
	m2();
}
 
public void m2() {
	A a2 = new A();
	m3();
}

public void m3() {
	int a3[] = 
  new int[]{3, 6, 7, 4, 9};
	m4();
}

public void m4() {
	A[] a4[] = new A[3];
}
...
```

通过上面的声明，如果，我们调用 m1() 看看会发生什么：

1.  当调用m1时，新栈帧（Frame-1）被推入栈，而局部变量i也在Frame-1中创建。
2.  然后在m1内调用m2，将另一个新栈帧（Frame-2）推入栈。在m2中，在堆中创建类A的对象，并将引用变量放在 Frame-2 帧中。此时，堆栈和堆如下所示：

![执行到方法 m2 内存情况](https://upload-images.jianshu.io/upload_images/1753960-53031438316a48fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 方法 m2 继续调用 m3，将另一个新栈帧（Frame-3）push 入栈，方法中，创建了 int[ ] 数组，并将引用 a3 返回放在 Frame-3 帧中。
4. 方法 m3 继续调用 m4，新栈帧（Frame-3）推入栈，方法 m4 中，创建了存储 A 类型的数组：A[ ] a4 = new A[3]; 数组长度为：3；并将引用 a4 返回放在 Frame-4 帧中。此时，堆栈和堆如下所示：

![方法调用内存示意图](https://upload-images.jianshu.io/upload_images/1753960-739295382dfb5529.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


数组的处理方式与对象相同，因此数组在内存中的位置是没有太大的区别。
三言两语，简单的说了一说数组，不知读者是否有所收获，欢迎留言！

笔者毕竟能力有限，难免有疏漏，如果，大家发现文章有何错误，请不吝赐教。谢谢！
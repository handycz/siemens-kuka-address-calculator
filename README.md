# Siemens KUKA address space converter
Simple web application that helps you to convert addresses between KUKA robots and Siemens PLC's. 

KUKA robots use bit addressing starting at 1, while Siemens addresses the values as 
<byte>.<bit in byte> (e.g., 7.2). Additionally, Siemens' address space is global, so in case of having multiple
devices, address of the robot may not start at 0.0. It's also possible to set non-zero offset of the robot in the
PLC project to mitigate that.

**The application can be accessed here:** 
[https://handycz.github.io/siemens-kuka-address-calculator](https://handycz.github.io/siemens-kuka-address-calculator)
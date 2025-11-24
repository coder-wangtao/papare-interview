// 第一次握手: 建立连接时，客户端发送syn包(seq=x)到服务器，并进入SYN_SEND状态，等待服务器确认;
// 第二次握手: 服务器收到syn包，必须确认客户的syn包，即ACK包(seq=x+1)，同时自己也发送一个SYN包(seq=y)，即SYN+ACK包，此时服务器进入SYN RECV状态;
// 第三次握手: 客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=y+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。

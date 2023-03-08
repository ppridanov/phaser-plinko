function ws(url, timeout) {
    let socket = new WebSocket(url);
    socket.data = null
    socket.addEventListener('message', (message) => {
        socket.data = message
    });
    socket.addEventListener('close', (message) => {
        socket = null
        setTimeout(ws(url, timeout), timeout);
        return message;
    });
    socket.addEventListener('open', () => console.log('socket connected'));
    return socket;

}

export default ws;
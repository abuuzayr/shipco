import React, { useState, useRef, useEffect } from 'react'
import { Link } from "gatsby"
import { IoSend, IoClose } from 'react-icons/io5'

const Chat = ({ setOverlay }) => {
    const [stage, setStage] = useState(0)
    const [messages, setMessages] = useState([])
    const messageContainer = useRef(null)
    const messageInput = useRef(null)
    const formSubmit = useRef(null)
    const chatContainer = useRef(null)
    const [message, setMessage] = useState('')
    const [stages, setStages] = useState([
        {
            stage: 'name',
            prompt: () => 'Hi there, you can start this fake chat by sharing your name. 😀'
        },
        {
            stage: 'email',
            validator: str => new RegExp(/^\S+@\S+\.\S+$/).test(str),
            validatorError: 'Hmm, that email seems invalid. Would you like to enter it again?',
            prompt: name => `${name} sounds like a great name! What is your email? I would be able to get in touch with you for real.`
        },
        {
            stage: 'message',
            prompt: () => 'Noted on the email. Would you like me to take note of the purpose of this message before we get in touch?'
        },
        {
            stage: 'end',
            prompt: () => {
                setTimeout(() => {
                    setMessages(oldMessages => [
                        ...oldMessages,
                        {
                            from: 'bot',
                            body: <span>In the meantime, you can keep checking your inbox or check out more of my work <Link to="/projects" className="font-bold">here</Link>!</span>
                        }
                    ])
                }, 3000)
                return 'Thank you for your message. As mentioned, this is a fake chat 😜. Give me some time, I will get back to you as soon as I can.'
            }
        },
    ])
    const handleKeyUp = e => {
        if (e.currentTarget.value && e.key && e.key === 'Enter') {
            sendMessage(message)
        } else {
            setMessage(e.currentTarget.value)
        }
    }
    const sendMessage = () => {
        setMessages(oldMessages => [
            ...oldMessages,
            {
                from: 'user',
                body: message
            }
        ])
        let valid = true
        if (stages[stage] && stages[stage].hasOwnProperty('validator')) {
            valid = stages[stage]['validator'](message)
        }
        if (valid) {
            setStage(prevStage => prevStage < stages.length - 1 ? prevStage + 1 : prevStage)
            setStages(oldStages => {
                const obj = [...oldStages]
                obj[stage]['value'] = message
                return obj
            })
            setMessage('')
        } else {
            setTimeout(() => {
                setMessages(oldMessages => [
                    ...oldMessages,
                    {
                        from: 'bot',
                        body: stages[stage]['validatorError']
                    }
                ])
            }, 1000)
        }
        if (messageInput && messageInput.current && stage < stages.length - 1) {
            messageInput.current.focus()
        }
    }
    const postMessage = async () => {
        // Send email
        if (formSubmit && formSubmit.current) {
            // Send email
            const data = new FormData(formSubmit.current)
            const response = await fetch('https://getform.io/f/de3d1629-3602-413e-b0f8-185cbd2f3cdb', {
                method: 'POST',
                body: data,
            })
        }
    }
    useEffect(() => {
        if (messageContainer && messageContainer.current) {
            messageContainer.current.scrollTo(0,messageContainer.current.scrollHeight)
        }
    }, [messages])
    useEffect(() => {
        if (stages[stage]) {
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        from: 'bot',
                        body: stages[stage]['prompt'](stages[stage > 0 ? stage - 1 : stage]['value'])
                    }
                ])
            }, 1000)
        }
        if (stage === stages.length - 1) postMessage()
    }, [stage])
    useEffect(() => {
        if (chatContainer && chatContainer.current && chatContainer.current.clientWidth > 680) {
            if (messageInput && messageInput.current && stage < stages.length - 1) {
                messageInput.current.focus()
            }
        }
    }, [chatContainer, messageInput])
    return (
        <div className="sm:block sm:p-0" ref={chatContainer}>
            {/* <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span> */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:align-middle sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-20 sm:pb-6">
                    <div className="font-bold text-2xl pb-4" style={{ color: "#062D5B" }}>Work with me</div>
                    <div>You can always email or contact me on my social platforms. Since you are already here, just send a message below!</div>
                </div>
                <div ref={messageContainer} className="px-4 sm:px-20 overflow-y-scroll chat-inner-container">
                    {messages.map((message, index) => {
                        const commonClasses = `rounded-t-2xl p-6 max-w-xs clear-both ${index === messages.length - 1 ? `mb-6` : 'mb-2'}`
                        return (
                            <div>
                                {message.from === 'user' ? (
                                    <div className={`${commonClasses} rounded-bl-2xl float-right`} style={{ background: "#EEEEEE" }}>
                                        {message.body}
                                    </div>
                                ) : (
                                    <div className={`${commonClasses} rounded-br-2xl float-left`} style={{ background: "#E7F2FF", color: "#062D5B" }}>
                                        {message.body}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className="w-full p-4 sm:p-6 border-t flex">
                    {stage < stages.length - 1 ? 
                        <>
                            <input className="rounded-l-full w-full px-5 py-2 outline-none" type="text" placeholder="Enter your message" style={{ background: "#F6F6F6" }} value={message} onChange={handleKeyUp} onKeyUp={handleKeyUp} ref={messageInput} />
                            <div className="rounded-r-full p-2" style={{ background: "#F6F6F6" }}>
                                <button type="button" className={`text-white rounded-full ${message ? "bg-gray-500 hover:bg-gray-700" : "bg-gray-400 cursor-default"}`} onClick={sendMessage}>
                                    <div className="flex items-center justify-items-center px-6 py-2 text-sm">
                                        <IoSend className="mr-2" /> <span className="font-bold">Send</span>
                                    </div>
                                </button>
                            </div>
                        </> :
                        <div className="mx-auto p-3">End of conversation <button type="button" style={{ color: "#F27400" }} className="font-bold" onClick={() => setStage(0)}>Reset Chat</button></div>
                    }
                </div>
            </div>
            <form action="https://getform.io/f/de3d1629-3602-413e-b0f8-185cbd2f3cdb" method="POST" className="hidden" ref={formSubmit}>
                <input type="text" name="name" value={stages[0]['value']} />
                <input type="email" name="email" value={stages[1]['value']} />
                <input type="text" name="message" value={stages[2]['value']} />
                <input type="submit" value="Send Email" />
            </form>
        </div>
    )
}

export default Chat
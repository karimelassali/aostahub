'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ChatTextarea() {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Sending message:', message)
      // Here you would typically send the message to your chat backend
      setMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    (<form
      onSubmit={handleSubmit}
      className="flex items-end space-x-2 p-4 bg-background border-t">
      <Textarea
        ref={textareaRef}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow min-h-[40px] max-h-[200px] resize-none"
        rows={1} />
      <Button type="submit" size="icon" className="mb-[3px]" disabled={!message.trim()}>
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>)
  );
}
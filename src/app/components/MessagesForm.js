"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Trash2, ChevronUp, ChevronDown, PlusCircle } from "lucide-react";

export default function MessagesForm({ data, setData }) {
  const messages = data.messages;
  const [editingMessage, setEditingMessage] = useState(null);

  const addMessage = () => {
    const newMessage = {
      id: Date.now(),
      image: "",
      sent: false,
      sendSuccess: false,
      seen: false,
      senderName: "",
      time: "",
      reactions: [],
      text: "",
    };
    setData((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, newMessage],
    }));
    setEditingMessage(newMessage);
  };

  const updateMessage = (updatedMessage) => {
    setData((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((msg) =>
        msg.id === updatedMessage.id ? updatedMessage : msg,
      ),
    }));
    setEditingMessage(null);
  };

  const deleteMessage = (id) => {
    setData((prevState) => ({
      ...prevState,
      messages: prevState.messages.filter((msg) => msg.id !== id),
    }));
    if (editingMessage?.id === id) {
      setEditingMessage(null);
    }
  };

  const moveMessage = (index, direction) => {
    const newMessages = [...data.messages];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newMessages.length) {
      [newMessages[index], newMessages[newIndex]] = [
        newMessages[newIndex],
        newMessages[index],
      ];
      setData((prevState) => ({
        ...prevState,
        messages: newMessages,
      }));
    }
  };

  return (
    <div className="overflow-auto">
      <Button onClick={addMessage} className="mb-4 flex gap-1">
        Add New
        <PlusCircle className="h-4 w-4" />
      </Button>
      {messages.map((message, index) => (
        <Card key={message.id} className="mb-4 bg-zinc-800 text-white">
          <CardContent className="flex items-center p-1">
            <div className="mr-2 flex flex-col">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveMessage(index, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveMessage(index, "down")}
                disabled={index === messages.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            {message.image ? (
              <div className="flex-grow">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-md bg-gray-200">
                  <img
                    src={message.image}
                    alt="Message"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="mr-4 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                {message.text}
              </div>
            )}
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingMessage(message)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMessage(message.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Dialog open={!!editingMessage}>
        <DialogContent className="w-[90%] bg-black sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingMessage && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateMessage(editingMessage);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingMessage.image}
                  onChange={(e) =>
                    setEditingMessage({
                      ...editingMessage,
                      image: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="text">Text</Label>
                <Textarea
                  id="text"
                  value={editingMessage.text}
                  onChange={(e) =>
                    setEditingMessage({
                      ...editingMessage,
                      text: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  id="senderName"
                  value={editingMessage.senderName}
                  onChange={(e) =>
                    setEditingMessage({
                      ...editingMessage,
                      senderName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={editingMessage.time}
                  onChange={(e) =>
                    setEditingMessage({
                      ...editingMessage,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sent"
                  checked={editingMessage.sent}
                  onCheckedChange={(checked) =>
                    setEditingMessage({ ...editingMessage, sent: checked })
                  }
                />
                <Label htmlFor="sent">Sent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sendSuccess"
                  checked={editingMessage.sendSuccess}
                  onCheckedChange={(checked) =>
                    setEditingMessage({
                      ...editingMessage,
                      sendSuccess: checked,
                    })
                  }
                />
                <Label htmlFor="sendSuccess">Send Success</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="seen"
                  checked={editingMessage.seen}
                  onCheckedChange={(checked) =>
                    setEditingMessage({ ...editingMessage, seen: checked })
                  }
                />
                <Label htmlFor="seen">Seen</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit">Save</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingMessage(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  PlusCircle,
  X,
} from "lucide-react";
import DateTimePicker from "@/app/components/DateTimePicker";
import EmojiPicker from "@/app/components/EmojiPicker";

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
      {messages
        .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
        .map((message) => (
          <Card key={message.id} className="mb-4 bg-zinc-800 text-white">
            <CardContent className="flex items-center justify-between gap-1 p-2">
              <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                {message.image ? (
                  <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-200">
                    <img
                      src={message.image}
                      alt="Message"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                    {message.text}
                  </div>
                )}
                <span className="text-xs text-zinc-500">
                  {new Date(message.dateTime).toLocaleDateString()}{" "}
                  {new Date(message.dateTime).toLocaleTimeString()}
                </span>
              </div>

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
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Edit message</DialogTitle>
            <Button
              className=""
              size="icon"
              onClick={() => setEditingMessage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
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
                  defaultValue={editingMessage.image}
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
                  defaultValue={editingMessage.text}
                  onChange={(e) =>
                    setEditingMessage({
                      ...editingMessage,
                      text: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Date and Time</Label>
                <DateTimePicker
                  defaultValue={editingMessage.dateTime}
                  onUpdate={(value) =>
                    setEditingMessage({ ...editingMessage, dateTime: value })
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
                <Label htmlFor="sent">Sender?</Label>
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
              <div>
                <Label>Reactions</Label>
                {editingMessage.reactions.map((reaction, index) => (
                  <div key={index} className="mt-2 flex items-center space-x-2">
                    <EmojiPicker
                      defaultValue={reaction.emoji}
                      onChange={(value) => {
                        const newReactions = [...editingMessage.reactions];
                        newReactions[index].emoji = value;
                        setEditingMessage({
                          ...editingMessage,
                          reactions: newReactions,
                        });
                      }}
                    />
                    <Input
                      type="number"
                      value={reaction.count}
                      onChange={(e) => {
                        const newReactions = [...editingMessage.reactions];
                        newReactions[index].count = parseInt(e.target.value);
                        setEditingMessage({
                          ...editingMessage,
                          reactions: newReactions,
                        });
                      }}
                      className="w-20"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        const newReactions = [...editingMessage.reactions];
                        newReactions.splice(index, 1);
                        setEditingMessage({
                          ...editingMessage,
                          reactions: newReactions,
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingMessage({
                      ...editingMessage,
                      reactions: [
                        ...editingMessage.reactions,
                        { emoji: "", count: 1 },
                      ],
                    });
                  }}
                  className="mt-2"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Reaction
                </Button>
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

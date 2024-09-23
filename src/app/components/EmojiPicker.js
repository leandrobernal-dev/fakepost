"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";

const emojis = [
  "👍",
  "👎",
  "❤️",
  "😂",
  "😮",
  "😢",
  "😡",
  "🎉",
  "🤔",
  "👀",
  "🔥",
  "🚀",
  "💯",
  "👏",
  "🙏",
  "💪",
  "✨",
  "🌟",
  "💖",
  "💔",
  "💩",
  "🤮",
  "🍕",
  "🍺",
  "🤷",
  "🙄",
  "😍",
  "🥳",
  "😎",
  "🤓",
  "🤯",
  "🤬",
  "💃",
  "🕺",
  "🏆",
  "🎁",
  "👑",
  "🤝",
  "🚫",
  "💔",
  "💸",
  "📊",
  "🎉",
  "👻",
  "🕸",
  "🔪",
  "💣",
  "🔥",
  "🌊",
  "🌈",
];

export default function EmojiPicker({ defaultValue, onChange }) {
  const [inputValue, setInputValue] = useState(defaultValue || "");
  useEffect(() => {
    if (onChange) onChange(inputValue);
  }, [inputValue]);

  const handleEmojiClick = (emoji) => {
    setInputValue(emoji);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || isEmoji(value)) {
      setInputValue(value);
    }
  };

  const isEmoji = useCallback((str) => {
    const regex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)$/u;
    return regex.test(str);
  }, []);

  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Select or type an emoji..."
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow text-center"
          maxLength={2}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Smile className="h-4 w-4" />
              <span className="sr-only">Open emoji picker</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-zinc-900 p-2">
            <div className="grid grid-cols-8 gap-2">
              {emojis.map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {inputValue && !isEmoji(inputValue) && (
        <p className="text-sm text-red-500">Please enter a valid emoji.</p>
      )}
    </div>
  );
}

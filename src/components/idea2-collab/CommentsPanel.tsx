import React, { useState } from 'react';
import { X, MessageSquare, Check, Send, CheckCircle2, CornerDownRight } from 'lucide-react';
import { SpatialCommentPin } from '../../types';

interface CommentsPanelProps {
  comments: SpatialCommentPin[];
  selectedPinId: string | null;
  onClose: () => void;
  onSelectPin: (id: string) => void;
  onAddReply: (pinId: string, replyText: string) => void;
  onToggleResolve: (pinId: string) => void;
}

export const CommentsPanel: React.FC<CommentsPanelProps> = ({
  comments,
  selectedPinId,
  onClose,
  onSelectPin,
  onAddReply,
  onToggleResolve
}) => {
  const [replyText, setReplyText] = useState('');
  const activePin = comments.find(c => c.id === selectedPinId) || comments[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activePin) return;
    onAddReply(activePin.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div className="w-80 md:w-88 shrink-0 h-full flex flex-col glass-panel border-l border-white/10 z-30 select-none overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-zinc-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-rose-400" />
          <h3 className="text-sm font-semibold text-white tracking-tight">
            3D Spatial Critiques
          </h3>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            {comments.length} Pins
          </span>
        </div>
        <button
          onClick={onClose}
          className="size-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {/* Pin Selector Pills */}
      <div className="p-2 border-b border-white/5 bg-zinc-950/40 flex gap-1.5 overflow-x-auto">
        {comments.map((pin) => (
          <button
            key={pin.id}
            onClick={() => onSelectPin(pin.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
              activePin?.id === pin.id
                ? 'bg-white/15 text-white border border-white/10 shadow-xs'
                : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            <span
              className="size-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
              style={{ backgroundColor: pin.authorColor }}
            >
              {pin.number}
            </span>
            <span className="truncate max-w-[90px]">{pin.author.split(' ')[0]}</span>
            {pin.resolved && <Check className="size-3 text-emerald-400" />}
          </button>
        ))}
      </div>

      {/* Active Thread Detail */}
      {activePin && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Main Pin Comment Card */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="size-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: activePin.authorColor }}
                  >
                    {activePin.number}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{activePin.author}</div>
                    <div className="text-[10px] text-zinc-400">{activePin.authorRole} · {activePin.timestamp}</div>
                  </div>
                </div>
                <button
                  onClick={() => onToggleResolve(activePin.id)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors border ${
                    activePin.resolved
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 border-white/5 hover:text-zinc-200'
                  }`}
                >
                  {activePin.resolved ? 'Resolved' : 'Mark Resolve'}
                </button>
              </div>

              <p className="text-xs text-zinc-200 leading-relaxed">
                {activePin.comment}
              </p>
            </div>

            {/* Replies Thread */}
            {activePin.replies.length > 0 && (
              <div className="space-y-2 pl-4 border-l-2 border-white/10 ml-2">
                {activePin.replies.map((reply, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-zinc-900/40 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-zinc-200">{reply.author}</span>
                      <span className="text-zinc-500">{reply.timestamp}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {reply.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Reply Input */}
          <form onSubmit={handleSendReply} className="p-3 border-t border-white/10 bg-zinc-900/40">
            <div className="relative">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Reply to this critique..."
                className="w-full pl-3 pr-9 py-2 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-zinc-200 focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 size-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors"
              >
                <Send className="size-3" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

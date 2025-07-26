import React, { useCallback, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Phone, PhoneOff, Mic, MicOff, MessageSquare } from 'lucide-react';

interface VoiceCallProps {
  isOpen: boolean;
  onClose: () => void;
  coachName: string;
  coachImage: string;
}

export function VoiceCall({ isOpen, onClose, coachName, coachImage }: VoiceCallProps) {
  const { start, end, status, isSpeaking, transcript } = useConversation({
    agentId: 'agent_0401k0sspebvf0f9h9vkgzgj4jrc',
    // Mock conversation context for David Goggins coaching style
    overrides: {
      agent: {
        prompt: {
          prompt: "You are David Goggins, the ultra-endurance athlete and motivational speaker. You're coaching someone who has been struggling with low energy and fatigue. Be direct, intense, and motivational but also supportive. Keep responses under 30 seconds. Use phrases like 'Stay hard', 'You got this', and challenge them to push through their comfort zone. Focus on their energy issues, sleep habits, and iron deficiency that was mentioned earlier."
        }
      }
    },
    onConnect: () => console.log('Connected to ElevenLabs'),
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      onClose();
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      // Fallback: show error message and close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    },
    onModeChange: (mode) => console.log('Mode changed:', mode),
  });

  const handleStart = useCallback(() => {
    if (start && typeof start === 'function') {
      start();
    }
  }, [start]);

  const handleEnd = useCallback(() => {
    if (end && typeof end === 'function') {
      end();
    }
    onClose();
  }, [end, onClose]);

  // Auto-start conversation when modal opens
  useEffect(() => {
    if (isOpen && status === 'disconnected' && start && typeof start === 'function') {
      handleStart();
    }
  }, [isOpen, status, handleStart]);

  if (!isOpen) return null;

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'connecting': return 'text-yellow-600';
      case 'disconnected': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      case 'error': return 'Connection Error';
      default: return 'Unknown';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-b from-[#075E54] to-[#128C7E] rounded-[20px] p-6 mx-4 max-w-sm w-full shadow-xl animate-slideUp text-white">
        <div className="text-center">
          {/* Coach Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
            <img 
              src={coachImage}
              alt={`${coachName} calling`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Coach Name */}
          <h3 className="font-medium text-[20px] mb-2">{coachName}</h3>
          
          {/* Status */}
          <div className="mb-6">
            <p className={`text-[16px] mb-2 ${getStatusColor()}`}>
              {getStatusText()}
            </p>
            {status === 'error' && (
              <p className="text-[14px] text-red-300 mb-2">
                Unable to connect. Closing in a moment...
              </p>
            )}
            {isSpeaking && (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[14px] text-green-400">Speaking...</span>
              </div>
            )}
          </div>

          {/* Transcript Display */}
          {transcript && transcript.length > 0 && (
            <div className="mb-4 max-h-32 overflow-y-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-3 text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare size={16} className="text-white opacity-70" />
                  <span className="text-[12px] text-white opacity-70">Live Transcript</span>
                </div>
                <div className="space-y-1 text-[13px]">
                  {transcript.slice(-3).map((entry, index) => (
                    <div key={index} className="text-white">
                      <span className="opacity-70">{entry.role === 'user' ? 'You: ' : 'Coach: '}</span>
                      <span>{entry.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="flex justify-center space-x-6">
            {/* Mute Button */}
            <button className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
              {status === 'connected' ? (
                <Mic size={24} className="text-white" />
              ) : (
                <MicOff size={24} className="text-white opacity-50" />
              )}
            </button>

            {/* End Call Button */}
            <button 
              onClick={handleEnd}
              className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 shadow-lg"
            >
              <PhoneOff size={24} className="text-white" />
            </button>
          </div>

          {/* Connection Info */}
          <div className="mt-4 text-[12px] text-white text-opacity-70">
            <p>
              {status === 'connected' 
                ? 'Speak naturally - Coach Goggins is listening' 
                : 'Tap the red button to end the call'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
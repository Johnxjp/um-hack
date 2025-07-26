import React, { useState } from 'react';
import { ChevronLeft, Phone, Video, MoreVertical, Mic, Camera, Plus, Send, Check, CheckCheck, Play, Zap, TrendingUp, Moon } from 'lucide-react';
import { VoiceCall } from './components/VoiceCall';

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedCoach, setSelectedCoach] = useState('');
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [uploadedPhotos, setUploadedPhotos] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const handlePhotoUpload = (taskId: string) => {
    const newUploaded = new Set(uploadedPhotos);
    newUploaded.add(taskId);
    setUploadedPhotos(newUploaded);
    
    // Also mark as completed
    const newCompleted = new Set(completedTasks);
    newCompleted.add(taskId);
    setCompletedTasks(newCompleted);
  };

  const navigateToScreen = (screenNumber: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screenNumber);
      setIsTransitioning(false);
    }, 150);
  };

  const WhatsAppHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <ChevronLeft 
          size={24} 
          className="cursor-pointer text-white" 
          onClick={() => navigateToScreen(Math.max(1, currentScreen - 1))} 
        />
        <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden">
          {selectedCoach === 'David Goggins' ? (
            <img 
              src="https://speaking.com/wp-content/uploads/2022/12/1651686963_David-Goggins.jpg" 
              alt="David Goggins" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-[17px] leading-tight">{title}</h3>
          {subtitle && <p className="text-[13px] opacity-75 leading-tight">{subtitle}</p>}
        </div>
      </div>
      <div className="flex space-x-4">
        <Video size={22} className="cursor-pointer text-white" />
        <Phone size={22} className="cursor-pointer text-white" />
        <MoreVertical size={22} className="cursor-pointer text-white" />
      </div>
    </div>
  );

  const MessageBubble = ({ 
    message, 
    isUser = false, 
    time, 
    hasButtons = false, 
    buttons = [], 
    onButtonClick 
  }: {
    message: string;
    isUser?: boolean;
    time: string;
    hasButtons?: boolean;
    buttons?: string[];
    onButtonClick?: (button: string) => void;
  }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-1 animate-fadeIn`}>
      <div className={`max-w-[85%] px-3 py-2 ${
        isUser 
          ? 'bg-[#DCF8C6] text-black rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[4px]' 
          : 'bg-white text-black rounded-tl-[4px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[18px] shadow-sm'
      } relative`}>
        <p className="text-[16px] leading-[1.3] whitespace-pre-line">{message}</p>
        {hasButtons && buttons && (
          <div className="mt-3 space-y-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => onButtonClick?.(button)}
                className="w-full text-left px-3 py-2 bg-[#E3F2FD] hover:bg-[#BBDEFB] rounded-[18px] border border-[#2196F3] text-[15px] font-normal text-[#1976D2] transition-all duration-200"
              >
                {button}
              </button>
            ))}
          </div>
        )}
        <div className={`flex items-center justify-end mt-1 space-x-1 ${isUser ? 'ml-4' : ''}`}>
          <span className="text-[12px] text-gray-500">{time}</span>
          {isUser && (
            <div className="flex">
              <CheckCheck size={16} className="text-[#4FC3F7]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TaskMessage = ({ 
    message, 
    time, 
    taskId, 
    isCompleted,
    hasPhotoUpload = false
  }: {
    message: string;
    time: string;
    taskId: string;
    isCompleted: boolean;
    hasPhotoUpload?: boolean;
  }) => (
    <div className="flex justify-start mb-1 animate-fadeIn">
      <div className="max-w-[85%] px-3 py-2 rounded-tl-[4px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[18px] bg-white text-black shadow-sm relative">
        <p className="text-[16px] leading-[1.3]">{message}</p>
        
        {/* Show uploaded photo if exists */}
        {hasPhotoUpload && uploadedPhotos.has(taskId) && (
          <div className="mt-3 mb-3">
            <div className="w-full h-40 rounded-[12px] overflow-hidden">
              <img 
                src="https://thevegan8.com/wp-content/uploads/2012/07/vegan-red-lentil-spinach-soup-oil-free-2-320x321.jpg" 
                alt="Iron-rich meal" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {hasPhotoUpload && !uploadedPhotos.has(taskId) ? (
          <button
            onClick={() => handlePhotoUpload(taskId)}
            className="mt-3 w-full px-3 py-2 rounded-[18px] border border-[#25D366] bg-[#E8F5E8] hover:bg-[#D4F4D4] text-[15px] font-medium transition-all duration-200"
          >
            <div className="flex items-center justify-center space-x-2">
              <Camera size={16} className="text-[#25D366]" />
              <span className="text-[#25D366]">Upload Photo</span>
            </div>
          </button>
        ) : !hasPhotoUpload ? (
          <button
            onClick={() => toggleTask(taskId)}
            className={`mt-3 w-full px-3 py-2 rounded-[18px] border text-[15px] font-medium transition-all duration-200 ${
              isCompleted
                ? 'bg-[#E8F5E8] border-[#25D366] text-[#25D366]'
                : 'bg-[#F5F5F5] hover:bg-[#EEEEEE] border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Check size={16} className={isCompleted ? 'text-[#25D366]' : 'text-gray-400'} />
              <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
            </div>
          </button>
        ) : null}

        {/* Show green check for completed photo upload */}
        {hasPhotoUpload && uploadedPhotos.has(taskId) && (
          <div className="mt-2 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-[#25D366]">
              <Check size={16} className="text-[#25D366]" />
              <span className="text-[15px] font-medium">Photo uploaded & logged</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end mt-1">
          <span className="text-[12px] text-gray-500">{time}</span>
        </div>
      </div>
    </div>
  );

  const VoiceNote = ({ message, time }: { message: string; time: string }) => (
    <div className="flex justify-start mb-1 animate-fadeIn">
      <div className="max-w-[85%] px-3 py-2 rounded-tl-[4px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[18px] bg-white text-black shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#128C7E] transition-colors cursor-pointer">
            <Play size={16} className="text-white ml-1" />
          </div>
          <div className="flex-1">
            <div className="h-4 bg-[#25D366] rounded-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full"></div>
            </div>
            <p className="text-[12px] text-gray-500 mt-1">0:15</p>
          </div>
        </div>
        <p className="text-[14px] italic text-gray-600 mt-2">"{message}"</p>
        <div className="flex items-center justify-end mt-1">
          <span className="text-[12px] text-gray-500">{time}</span>
        </div>
      </div>
    </div>
  );

  const ProgressChart = () => (
    <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100 mb-3 animate-slideUp">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-[#128C7E]" />
        <h3 className="font-semibold text-lg text-center">6-Week Progress Summary</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-4 h-4 text-green-600" />
          <h4 className="font-medium text-sm">HRV Trend</h4>
        </div>
        <div className="h-12 relative">
          <svg viewBox="0 0 300 80" className="w-full h-full">
            <polyline
              fill="none"
              stroke="#25D366"
              strokeWidth="2"
              points="10,60 60,55 110,50 160,45 210,40 260,30"
            />
            <circle cx="260" cy="30" r="3" fill="#25D366" />
          </svg>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Moon className="w-4 h-4 text-blue-600" />
          <h4 className="font-medium text-sm">Deep Sleep Hours</h4>
        </div>
        <div className="flex items-end space-x-2 h-12">
          {[1.5, 2.1, 2.8, 3.2, 3.6, 4.1].map((value, index) => (
            <div key={index} className="flex-1 bg-[#25D366] rounded-t" style={{height: `${(value / 4.5) * 100}%`}}></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Week 1</span>
          <span>Week 6</span>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-2">Energy Score</h4>
        <div className="flex items-center space-x-4">
          <span className="text-xs">2.0</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
          </div>
          <span className="text-xs font-bold">4.5</span>
        </div>
      </div>
    </div>
  );

  const DataVisualization = () => (
    <div className="bg-white rounded-lg p-3 shadow-lg border border-gray-100 mb-3 animate-slideUp">
      <h4 className="font-medium text-sm mb-2 text-center text-gray-700">Your Health Data Analysis</h4>
      
      {/* HRV Chart */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-600">HRV (Heart Rate Variability)</span>
          <span className="text-xs font-medium text-red-600">Low ⚠️</span>
        </div>
        <div className="h-8 relative bg-gray-50 rounded">
          <svg viewBox="0 0 200 48" className="w-full h-full">
            <polyline
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              points="10,35 40,32 70,30 100,28 130,25 160,22 190,20"
            />
            <circle cx="190" cy="20" r="2" fill="#ef4444" />
          </svg>
          <div className="absolute bottom-1 left-2 text-xs text-gray-500">25ms</div>
          <div className="absolute bottom-1 right-2 text-xs text-red-600 font-medium">18ms</div>
        </div>
        <p className="text-xs text-gray-600 mt-1 italic">Your stress recovery is declining - your body isn't bouncing back between heartbeats like it should.</p>
      </div>

      {/* Deep Sleep Chart */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-600">Deep Sleep Duration</span>
          <span className="text-xs font-medium text-orange-600">Below Target ⚠️</span>
        </div>
        <div className="flex items-end space-x-1 h-8 bg-gray-50 rounded p-1">
          {[1.2, 0.8, 1.5, 0.9, 1.1, 0.7, 1.0].map((value, index) => (
            <div 
              key={index} 
              className="flex-1 bg-orange-400 rounded-t" 
              style={{height: `${(value / 2.5) * 100}%`}}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>7 days ago</span>
          <span className="text-orange-600 font-medium">Avg: 1.0h (Target: 2h+)</span>
        </div>
        <p className="text-xs text-gray-600 mt-1 italic">You're getting half the deep sleep you need - that's why you wake up tired.</p>
      </div>

      {/* Caffeine Intake */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-600">Daily Caffeine Intake</span>
          <span className="text-xs font-medium text-red-600">High ⚠️</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">0mg</span>
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div className="bg-red-500 h-3 rounded-full" style={{width: '85%'}}></div>
          </div>
          <span className="text-xs text-red-600 font-medium">425mg</span>
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">Recommended: &lt;400mg</div>
        <p className="text-xs text-gray-600 mt-1 italic">You're overdosing on caffeine - it's blocking your deep sleep and creating a vicious cycle.</p>
      </div>

      {/* Diet Analysis */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-600">Iron Absorption Risk</span>
          <span className="text-xs font-medium text-yellow-600">Moderate ⚠️</span>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-2">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs">Plant-based diet detected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs">Lower iron bioavailability</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 italic">Your plant-based diet is healthy, but your body absorbs less iron from plants than meat - you need to be strategic.</p>
      </div>
    </div>
  );

  const InputBar = () => (
    <div className="bg-[#F0F0F0] px-4 py-2 flex items-center space-x-2">
      <Plus size={24} className="text-[#8696A0] cursor-pointer" />
      <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center space-x-2">
        <span className="text-[#8696A0] text-[16px] flex-1">Message</span>
        <Camera size={20} className="text-[#8696A0] cursor-pointer" />
        <Mic size={20} className="text-[#8696A0] cursor-pointer" />
      </div>
      <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center cursor-pointer">
        <Mic size={20} className="text-white" />
      </div>
    </div>
  );

  const renderScreen = () => {
    if (isTransitioning) {
      return (
        <div className="bg-[#E5DDD5] min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#128C7E]"></div>
        </div>
      );
    }

    switch (currentScreen) {
      case 1:
        return (
          <div className="bg-[#E5DDD5] h-screen animate-fadeIn">
            <div className="bg-[#075E54] text-white px-4 py-6 text-center">
              <h1 className="text-xl font-bold">OptimallyMe</h1>
              <p className="text-sm opacity-90 mt-1">Choose your coaching style</p>
            </div>
            <div className="px-4 py-6 space-y-4">
              <div 
                className="bg-white rounded-[12px] p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 shadow-sm"
                onClick={() => {setSelectedCoach('Michelle Obama'); navigateToScreen(2);}}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/6/63/Michelle_Obama_2013_official_portrait_%282%29.jpg" 
                      alt="Michelle Obama" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-pink-700">Michelle Obama</h3>
                    <p className="text-[14px] text-gray-500 mb-1">Soft & Supportive</p>
                    <p className="text-[15px] italic text-gray-600">"Let's take care of you—step by step." 🌸</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white rounded-[12px] p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 shadow-sm"
                onClick={() => {setSelectedCoach('Simu Liu'); navigateToScreen(2);}}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src="https://cdn.britannica.com/06/242206-050-E18E3ABD/Simu-Liu-actor-2022.jpg" 
                      alt="Simu Liu" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-700">Simu Liu</h3>
                    <p className="text-[14px] text-gray-500 mb-1">Medium & Balanced</p>
                    <p className="text-[15px] italic text-gray-600">"I've got your back—but we still get it done." 💪</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white rounded-[12px] p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 shadow-sm"
                onClick={() => {setSelectedCoach('David Goggins'); navigateToScreen(2);}}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src="https://speaking.com/wp-content/uploads/2022/12/1651686963_David-Goggins.jpg" 
                      alt="David Goggins" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-700">David Goggins</h3>
                    <p className="text-[14px] text-gray-500 mb-1">Hard & Intense</p>
                    <p className="text-[15px] italic text-gray-600">"You said you want energy? Then earn it." 🔥</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-[#E5DDD5] min-h-screen flex flex-col animate-fadeIn">
            <WhatsAppHeader title="Coach Goggins" subtitle="online" />
            <div className="flex-1 px-4 py-4 bg-[#E5DDD5]">
              <MessageBubble 
                message="I've been feeling super fatigued lately. I want my energy back." 
                isUser={true}
                time="2:14 PM"
              />
              <MessageBubble 
                message="Course you do. But wanting ain't doing. Let's figure out what's really draining you." 
                time="2:15 PM"
              />
            </div>
            <InputBar />
          </div>
        );

      case 3:
        return (
          <div className="bg-[#E5DDD5] min-h-screen flex flex-col animate-fadeIn">
            <WhatsAppHeader title="Coach Goggins" subtitle="online" />
            <div className="flex-1 px-4 py-4 bg-[#E5DDD5]">
              <MessageBubble 
                message="I've been feeling super fatigued lately. I want my energy back." 
                isUser={true}
                time="2:14 PM"
              />
              <MessageBubble 
                message="Course you do. But wanting ain't doing. Let's figure out what's really draining you." 
                time="2:15 PM"
              />
              <MessageBubble 
                message="Why do you think you're tired?"
                time="2:16 PM"
                hasButtons={true}
                buttons={[
                  "I haven't been sleeping well",
                  "I've been skipping meals",
                  "Too much stress"
                ]}
                onButtonClick={() => navigateToScreen(4)}
              />
            </div>
            <InputBar />
          </div>
        );

      case 4:
        return (
          <div className="bg-[#E5DDD5] h-screen flex flex-col animate-fadeIn overflow-hidden">
            <WhatsAppHeader title="Coach Goggins" subtitle="online" />
            <div className="flex-1 px-4 py-2 bg-[#E5DDD5] overflow-y-auto">
              <MessageBubble 
                message="Why do you think you're tired?"
                time="2:16 PM"
              />
              <MessageBubble 
                message="I haven't been sleeping well" 
                isUser={true}
                time="2:17 PM"
              />
              <MessageBubble 
                message="Mind if I check your wearable and blood data?" 
                time="2:18 PM"
              />
              <MessageBubble 
                message="Yes, go ahead." 
                isUser={true}
                time="2:18 PM"
              />
              <MessageBubble 
                message="Your iron's low. Your deep sleep is shallow. You're living on caffeine. Let's fix it." 
                time="2:20 PM"
              />
              <DataVisualization />
            </div>
            <InputBar />
          </div>
        );

      case 5:
        return (
          <div className="bg-[#E5DDD5] min-h-screen flex flex-col animate-fadeIn">
            <WhatsAppHeader title="Coach Goggins" subtitle="online" />
            <div className="flex-1 px-4 py-4 bg-[#E5DDD5]">
              <TaskMessage 
                message="Eat iron-rich food today. Lentils, spinach, tofu. No debate."
                time="8:30 AM"
                taskId="iron-food"
                isCompleted={completedTasks.has('iron-food')}
                hasPhotoUpload={true}
              />
              <TaskMessage 
                message="Caffeine cut-off: 2PM."
                time="12:00 PM"
                taskId="caffeine-cutoff"
                isCompleted={completedTasks.has('caffeine-cutoff')}
              />
              <TaskMessage 
                message="Lights out at 10:30PM. That's non-negotiable."
                time="9:00 PM"
                taskId="lights-out"
                isCompleted={completedTasks.has('lights-out')}
              />
            </div>
            <InputBar />
          </div>
        );

      case 6:
        return (
          <div className="bg-[#E5DDD5] h-screen flex flex-col relative animate-fadeIn">
            <WhatsAppHeader title="Coach Goggins" subtitle="online" />
            <div className="flex-1 px-4 py-4 bg-[#E5DDD5]">
              <TaskMessage 
                message="Eat iron-rich food today. Lentils, spinach, tofu. No debate."
                time="8:30 AM"
                taskId="iron-food"
                isCompleted={false}
              />
              <TaskMessage 
                message="Caffeine cut-off: 2PM."
                time="12:00 PM"
                taskId="caffeine-cutoff"
                isCompleted={false}
              />
              <TaskMessage 
                message="Lights out at 10:30PM. That's non-negotiable."
                time="9:00 PM"
                taskId="lights-out"
                isCompleted={true}
              />
            </div>
            
            {/* Incoming Call Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fadeIn">
              <div className="bg-white rounded-[20px] p-6 mx-4 max-w-sm w-full shadow-xl animate-slideUp">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#25D366] animate-pulse">
                    <img 
                      src="https://speaking.com/wp-content/uploads/2022/12/1651686963_David-Goggins.jpg" 
                      alt="David Goggins calling" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-[18px] mb-2">📞 Incoming voice note</h3>
                  <p className="text-[15px] text-gray-600 mb-4">from Coach Goggins</p>
                  <div className="bg-gray-100 rounded-[12px] p-3 mb-4">
                    <p className="text-[15px] italic">"You said you wanted this. Then why'd you stop? Stay hard."</p>
                  </div>
                  <button 
                    className="w-full bg-[#25D366] text-white py-3 rounded-[25px] font-medium text-[16px] hover:bg-[#128C7E] transition-all duration-200"
                    onClick={() => setIsVoiceCallOpen(true)}
                  >
                    Listen Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="bg-[#E5DDD5] h-screen flex flex-col animate-fadeIn overflow-hidden">
            <WhatsAppHeader title="Progress Summary" subtitle="6 weeks later" />
            <div className="flex-1 px-4 py-2 bg-[#E5DDD5] overflow-y-auto">
              <ProgressChart />
              <div className="bg-gradient-to-r from-[#E7F3FF] to-[#F0F8FF] border border-blue-200 rounded-lg p-3 text-center shadow-md animate-slideUp">
                <p className="text-sm text-blue-800">
                  <strong>After 6 weeks of nudging and feedback, Adam's energy is back on track.</strong>
                </p>
              </div>
            </div>
            <InputBar />
          </div>
        );

      case 8:
        return (
          <div className="bg-[#E5DDD5] min-h-screen flex flex-col animate-fadeIn">
            <WhatsAppHeader title="Coach Goggins" subtitle="online" />
            <div className="flex-1 px-4 py-4 bg-[#E5DDD5]">
              <MessageBubble 
                message="You proved you can change. Don't stop now. What's next?"
                time="3:22 PM"
                hasButtons={true}
                buttons={["Set a new goal"]}
                onButtonClick={() => navigateToScreen(1)}
              />
            </div>
            <InputBar />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-black h-screen relative overflow-hidden flex flex-col">
      {/* Voice Call Modal */}
      <VoiceCall 
        isOpen={isVoiceCallOpen}
        onClose={() => {
          setIsVoiceCallOpen(false);
          // Navigate to next screen after call ends
          setTimeout(() => navigateToScreen(7), 500);
        }}
        coachName="Coach Goggins"
        coachImage="https://speaking.com/wp-content/uploads/2022/12/1651686963_David-Goggins.jpg"
      />
      
      {/* Status bar */}
      <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-xs safe-area-top">
        <span>9:41 AM</span>
        <div className="flex space-x-1">
          <div className="w-4 h-2 border border-white rounded-sm">
            <div className="w-full h-full bg-green-400 rounded-sm"></div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>

      {/* Navigation */}
      <div className="bg-[#1F2937] text-white p-3 flex justify-between items-center safe-area-bottom border-t border-gray-600 flex-shrink-0">
        <div className="text-xs">
          Screen {currentScreen} of 8
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigateToScreen(Math.max(1, currentScreen - 1))}
            className="bg-[#374151] px-3 py-1 rounded-[6px] text-xs hover:bg-[#4B5563] disabled:opacity-50 transition-all duration-200"
            disabled={currentScreen === 1}
          >
            Previous
          </button>
          <button 
            onClick={() => navigateToScreen(Math.min(8, currentScreen + 1))}
            className="bg-[#25D366] px-3 py-1 rounded-[6px] text-xs hover:bg-[#128C7E] disabled:opacity-50 transition-all duration-200"
            disabled={currentScreen === 8}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
"use client";

// import { motion } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Plus,
  Star,
  MoreVertical,
  Pin,
  Archive,
  Sheet,
  ChevronLeft,
  CalendarDays,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const conversations = [
  {
    id: 1,
    name: "DeFi Project Team",
    participants: [
      { name: "Alice Johnson", avatar: "/avatars/alice.jpg" },
      { name: "Bob Smith", avatar: "/avatars/bob.jpg" },
      { name: "Carol Williams", avatar: "/avatars/carol.jpg" },
    ],
    lastMessage: "Let's discuss the new staking feature implementation.",
    timestamp: "2 min ago",
    unread: 3,
    pinned: true,
  },
  {
    id: 2,
    name: "NFT Marketplace Design",
    participants: [
      { name: "David Brown", avatar: "/avatars/david.jpg" },
      { name: "Eva Martinez", avatar: "/avatars/eva.jpg" },
    ],
    lastMessage: "I've uploaded the new UI mockups for review.",
    timestamp: "1 hour ago",
    unread: 0,
    pinned: true,
  },
  {
    id: 3,
    name: "Smart Contract Audit",
    participants: [
      { name: "Frank Lee", avatar: "/avatars/frank.jpg" },
      { name: "Grace Kim", avatar: "/avatars/grace.jpg" },
    ],
    lastMessage: "The initial audit report is ready for your review.",
    timestamp: "3 hours ago",
    unread: 1,
    pinned: false,
  },
  {
    id: 4,
    name: "Community Support",
    participants: [
      { name: "Henry Wilson", avatar: "/avatars/henry.jpg" },
      { name: "Ivy Chen", avatar: "/avatars/ivy.jpg" },
    ],
    lastMessage: "We need to address the recent community feedback.",
    timestamp: "Yesterday",
    unread: 0,
    pinned: false,
  },
];

export default function MessagesPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<
    (typeof conversations)[0] | null
  >(null);
  return (
    <div className="h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="h-full w-full hidden lg:block md:hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="hidden lg:block md:hidden"
        >
          <ResizablePanel minSize={30} maxSize={40}>
            <div className="w-full md:w-full border-r border-border p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Messages</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="default">
                      <Plus size={20} strokeWidth={3} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Person</DialogTitle>
                      <DialogDescription>
                        Add a person to your list here. Click save when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Name</Label>
                        <Input
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Username</Label>
                        <Input
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>

              <ScrollArea className="flex-1 -mx-4">
                <div className="px-4 space-y-4">
                  {conversations.map((conversation, index) => (
                    // <motion.div
                    //   key={conversation.id}
                    //   initial={{ x: -20, opacity: 0 }}
                    //   animate={{ x: 0, opacity: 1 }}
                    //   transition={{ delay: index * 0.1 }}
                    // >
                    <Card
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        conversation.pinned ? "border-primary/50 border-2" : ""
                      }`}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        setChatOpen(true);
                      }}
                    >
                      <CardHeader className="p-4 pb-2 space-y-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-sm font-medium">
                              {conversation.name}
                            </CardTitle>
                            {conversation.pinned && (
                              <Pin
                                size={12}
                                className="text-muted-foreground"
                              />
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Pin className="mr-2 h-4 w-4" />
                                {conversation.pinned ? "Unpin" : "Pin"}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex -space-x-2">
                            {conversation.participants
                              .slice(0, 3)
                              .map((participant) => (
                                <Avatar
                                  key={participant.name}
                                  className="h-6 w-6 border-2 border-background"
                                >
                                  <AvatarImage src={participant.avatar} />
                                  <AvatarFallback>
                                    {participant.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                          </div>
                          {conversation.participants.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{conversation.participants.length - 3} more
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {conversation.timestamp}
                          </span>
                          {conversation.unread > 0 && (
                            <Badge
                              variant="default"
                              className="h-5 w-5 rounded-full p-0 flex items-center justify-center"
                            >
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    // </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className="relative w-full h-full flex-1 hidden p-8 lg:flex items-center flex-col justify-center bg-muted/10">
              {selectedConversation && (
                <div className="w-full top-0 absolute h-20 shadow-md shadow-black/50">
                  <div className="px-4 w-full h-full flex items-center justify-between">
                    <div className="h-full flex items-center justify-center gap-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className=""
                        onClick={() => setSelectedConversation(null)}
                      >
                        <ChevronLeft size={20} strokeWidth={3} />
                      </Button>

                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center justify-center gap-2.5 hover:bg-muted/50 rounded-md p-2.5 pr-9">
                            <Avatar className="h-10 w-10 border-2 border-background">
                              <AvatarImage
                                src={
                                  selectedConversation.participants[0].avatar
                                }
                              />
                              <AvatarFallback>
                                {selectedConversation.participants[0].name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-medium">
                              {selectedConversation.name}
                            </h3>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between space-x-4">
                            <Avatar>
                              <AvatarImage src="https://github.com/vercel.png" />
                              <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">@nextjs</h4>
                              <p className="text-sm">
                                The React Framework – created and maintained by
                                @vercel.
                              </p>
                              <div className="flex items-center pt-2">
                                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                                <span className="text-xs text-muted-foreground">
                                  Joined December 2021
                                </span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="h-full flex items-center justify-center gap-2.5">
                      <Button size="icon" variant="ghost" className="">
                        <Search size={20} strokeWidth={3} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <h2>Clear chat</h2>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {selectedConversation?.name}
                </h3>
                <p className="text-sm text-muted-foreground">No messages yet</p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="lg:hidden md:block w-full md:w-full border-r border-border p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="default">
                <Plus size={20} strokeWidth={3} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Person</DialogTitle>
                <DialogDescription>
                  Add a person to your list here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <Input defaultValue="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Username</Label>
                  <Input defaultValue="@peduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {!chatOpen && (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>

            <ScrollArea className="flex-1 -mx-4">
              <div className="px-4 space-y-4">
                {conversations.map((conversation, index) => (
                  // <motion.div
                  //   key={conversation.id}
                  //   initial={{ x: -20, opacity: 0 }}
                  //   animate={{ x: 0, opacity: 1 }}
                  //   transition={{ delay: index * 0.1 }}
                  // >
                  <Card
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      conversation.pinned ? "border-primary/50 border-2" : ""
                    }`}
                    onClick={() => {
                      setSelectedConversation(conversation);
                      setChatOpen(true);
                    }}
                  >
                    <CardHeader className="p-4 pb-2 space-y-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-medium">
                            {conversation.name}
                          </CardTitle>
                          {conversation.pinned && (
                            <Pin size={12} className="text-muted-foreground" />
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pin className="mr-2 h-4 w-4" />
                              {conversation.pinned ? "Unpin" : "Pin"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex -space-x-2">
                          {conversation.participants
                            .slice(0, 3)
                            .map((participant) => (
                              <Avatar
                                key={participant.name}
                                className="h-6 w-6 border-2 border-background"
                              >
                                <AvatarImage src={participant.avatar} />
                                <AvatarFallback>
                                  {participant.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                        </div>
                        {conversation.participants.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{conversation.participants.length - 3} more
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                        {conversation.unread > 0 && (
                          <Badge
                            variant="default"
                            className="h-5 w-5 rounded-full p-0 flex items-center justify-center"
                          >
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  // </motion.div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>

      {/* Main Content */}
      {chatOpen && selectedConversation && (
        <div className="relative h-full md:flex p-8 flex items-center justify-center bg-muted/10">
          <div className="w-full absolute top-0 z-[5000] h-20 shadow-md shadow-black/50">
                  <div className="px-4 w-full h-full flex items-center justify-between">
                    <div className="h-full flex items-center justify-center gap-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className=""
                        onClick={() => setChatOpen(false)}
                      >
                        <ChevronLeft size={20} strokeWidth={3} />
                      </Button>

                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center justify-center gap-2.5 hover:bg-muted/50 rounded-md p-2.5 pr-9">
                            <Avatar className="h-10 w-10 border-2 border-background">
                              <AvatarImage
                                src={
                                  selectedConversation.participants[0].avatar
                                }
                              />
                              <AvatarFallback>
                                {selectedConversation.participants[0].name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-medium">
                              {selectedConversation.name}
                            </h3>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between space-x-4">
                            <Avatar>
                              <AvatarImage src="https://github.com/vercel.png" />
                              <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">@nextjs</h4>
                              <p className="text-sm">
                                The React Framework – created and maintained by
                                @vercel.
                              </p>
                              <div className="flex items-center pt-2">
                                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                                <span className="text-xs text-muted-foreground">
                                  Joined December 2021
                                </span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="h-full flex items-center justify-center gap-2.5">
                      <Button size="icon" variant="ghost" className="">
                        <Search size={20} strokeWidth={3} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <h2>Clear chat</h2>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            {selectedConversation ? (
              <>
                <h3 className="text-lg font-medium mb-2">
                  {selectedConversation.name}
                </h3>
                <p className="text-sm text-muted-foreground">No messages yet</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-2">
                  Select a Conversation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose a conversation from the sidebar to start messaging
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

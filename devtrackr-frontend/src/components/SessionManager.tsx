import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getUserProfile, generateSessionKey } from "@/api/auth";

export const SessionManager = () => {
  const [sessionKey, setSessionKey] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSessionKey = async () => {
    setLoading(true);
    try {
      const profile = await getUserProfile();

      if (!profile.sessionKey) {
        const { sessionKey: newKey } = await generateSessionKey();
        setSessionKey(newKey);
        toast({
          title: "Session Key Generated",
          description: `New session key: ${newKey}`,
        });
      } else {
        setSessionKey(profile.sessionKey);
      }
    } catch (err) {
      console.error("Error fetching session key:", err);
      toast({
        title: "Error",
        description: "Failed to fetch session key",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionKey();
  }, []);

  const handleGenerateKey = async () => {
    setLoading(true);
    try {
      const { sessionKey: newKey } = await generateSessionKey();
      setSessionKey(newKey);
      toast({
        title: "Session Key Generated",
        description: `New session key: ${newKey}`,
      });
    } catch (err) {
      console.error("Error generating session key:", err);
      toast({
        title: "Error",
        description: "Failed to generate session key",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Disconnected" : "Connected",
      description: isConnected
        ? "Session disconnected"
        : "Session connected successfully",
    });
  };

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/30 dark:border-slate-700/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-emerald-500" : "bg-red-500"
              } animate-pulse shadow-lg`}
            />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Session Status
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                {loading ? "Loading..." : sessionKey || "No key"}
              </p>
            </div>
          </div>
          <Badge
            variant={isConnected ? "default" : "destructive"}
            className="px-3 py-1 rounded-full"
          >
            {isConnected ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateKey}
            disabled={loading}
            className="rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          >
            {loading ? "Generating..." : "Generate Key"}
          </Button>
          <Button
            size="sm"
            onClick={toggleConnection}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </div>
    </div>
  );
};

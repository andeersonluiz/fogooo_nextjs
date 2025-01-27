import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Feedback } from "../../domain/feedback";

class SupabaseHandler {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  async getAllPlayers() {
    const { data, error } = await this.supabase.from("players").select();
    if (error) {
      return null;
    }
    return data;
  }

  async getSortedPlayer() {
    const { data: sortedId, error: errorSortedId } = await this.supabase
      .from("sortedIds")
      .select()
      .order("order", { ascending: false })
      .limit(1);

    if (errorSortedId) {
      return null;
    }
    const { data, error: errorPlayer } = await this.supabase
      .from("players")
      .select()
      .eq("id", sortedId![0]["id"])
      .limit(1);
    if (errorPlayer || !data) {
      return null;
    }

    return data[0];
  }

  async getOrderNumber() {
    const { data: sortedId, error } = await this.supabase
      .from("sortedIds")
      .select()
      .order("order", { ascending: false })
      .limit(1);
    if (error || !sortedId) {
      return null;
    }
    return sortedId[0]["order"].toString();
  }

  async getVersionNumber() {
    const { data: sortedId, error } = await this.supabase
      .from("version")
      .select()
      .limit(1);

    if (error || !sortedId) {
      return null;
    }
    return sortedId[0]["version_number"];
  }

  async sendFeedback(feedback: Feedback) {
    try {
      await this.supabase.from("feedback").insert({
        name: feedback.name,
        email: feedback.email,
        subject: feedback.subject,
        content: feedback.content,
      });
      return true;
    } catch {
      return false;
    }
  }
}

export default SupabaseHandler;

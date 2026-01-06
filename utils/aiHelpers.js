// Small helper utilities for AI-related tasks
module.exports = {
  summarize: (text) => {
    // TODO: implement a real summarizer
    return `Summary of: ${String(text).slice(0, 120)}`;
  }
};

const useFooter = () => {
  const handleSectionLink = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return {
    handlers: {
      handleSectionLink,
    },
  };
};

export default useFooter;

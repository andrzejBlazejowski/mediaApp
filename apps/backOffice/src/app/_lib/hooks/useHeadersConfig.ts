import { useState } from "react";

import type { HeadersConfig } from "~/app/_components/TableView";

export function useHeadersConfig(initialHeadersConfig: HeadersConfig) {
  const [headersConfig, setHeadersConfig] = useState(initialHeadersConfig);
  return { headersConfig, setHeadersConfig };
}

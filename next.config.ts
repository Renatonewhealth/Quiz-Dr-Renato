import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // O teste de VSL virou tela única: /vsl-lead-test já abre o vídeo.
      // A rota antiga (destino pós-quiz) redireciona pra não quebrar links
      // que já circularam. Query string (utm_vsl_lead etc.) é preservada.
      {
        source: "/vsl-lead-test-vsl",
        destination: "/vsl-lead-test",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

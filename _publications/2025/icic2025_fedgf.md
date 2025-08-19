---
title: "FedGF: Layer-Wise Federated Learning with Group Fairness Guarantees"
date:           2025-05-12 00:01:00 +0800
pub: "International Conference on Intelligent Computing (ICIC)"
pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Oral</span>'
pub_date:       "2025"
selected:       true

abstract: Federated Learning (FL) enables collaborative training without sharing raw data but often suffers fairness issues under non-IID distributions. Prior work targets client-level fairness yet overlooks demographic-group biases. We propose <strong>FedGF</strong>, a layer-wise method that embeds demographic-parity constraints into each layer’s descent direction, jointly optimizing accuracy, client fairness, and group fairness. Extensive experiments on benchmark datasets demonstrate that FedGF reduces group accuracy gaps by 78% compared to state-of-the-art methods while maintaining comparable model performance. Our method establishes new benchmarks for both client fairness (0.0862 fairness indicator on FMNIST) and group fairness (0.0002 demographic parity difference on CIFAR-10), highlighting its effectiveness in creating more equitable federated learning systems.
cover:          /assets/images/covers/icic.png
authors:
    - Yu Huo*
    - Yating Li*
    - Xiaoying Tang#
links:
    Paper: https://link.springer.com/chapter/10.1007/978-981-95-0011-6_33
--- 
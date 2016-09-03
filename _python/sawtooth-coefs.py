import numpy as np
import matplotlib.pyplot as plt

# pi = np.pi
# sin = np.sin
# _2pi = 2 * pi

# x = np.linspace(0, 1, 1000)
# y = (
#   (
#     (
#       (
#         2 * np.sin((x + 0.5) * _2pi)
#         - 2 * np.sin(2 * (x + 0.5) * _2pi) / (2)
#         + 2 * np.sin(3 * (x + 0.5) * _2pi) / (3)
#         - 2 * np.sin(4 * (x + 0.5) * _2pi) / (4)
#         + 2 * np.sin(5 * (x + 0.5) * _2pi) / (5)
#         - 2 * np.sin(6 * (x + 0.5) * _2pi) / (6)
#         + 2 * np.sin(7 * (x + 0.5) * _2pi) / (7)
#         - 2 * np.sin(8 * (x + 0.5) * _2pi) / (8)
#       ) / pi # normalize y axis
#     ) + 1
#   ) / 2
# )

# plt.plot(x, y)
# plt.show()
# looks good !

sin = np.sin
pi = np.pi
_2pi = 2 * np.pi

nbrsteps = 4 # real steps are nbrsteps + 1 because of phase
x = np.linspace(0, 1, 1000)

# simple form
y1 = (
  (
    (nbrsteps * _2pi * x) + sin(nbrsteps * _2pi * x)
  ) / (nbrsteps * _2pi) # normalization
)

# skew form
y2 = (
  (
    (
      (nbrsteps * _2pi * x) + 1.2 * sin(nbrsteps * _2pi * x)
    ) / (nbrsteps * _2pi) # normalization
  )
)

_x = x - (1. / (nbrsteps * 2)) # phase offset
# phase shift
y3 = (
  (
    (
      (nbrsteps * _2pi * x) + 1.2 * sin(nbrsteps * _2pi * _x)
    ) / (nbrsteps * _2pi) # normalization
  )
)

p1, = plt.plot(x, y1, label='simple')
p2, = plt.plot(x, y2, label='skewed')
p3, = plt.plot(x, y3, label='shifted')
plt.title('transfert function')
plt.legend(handles=[p1, p2, p3])
plt.show()
# # looks better !!!

# test skew
# sin = np.sin
# pi = np.pi
# _2pi = 2 * pi

# x = np.linspace(0, 2 * _2pi, 1000)
# y0 = sin(x)
# y1 = sin(np.sqrt(x % 1) * _2pi)
# y2 = x + sin(x)

# plt.plot(x, y0)
# plt.plot(x, y1)
# plt.plot(x, y2)
# plt.show()



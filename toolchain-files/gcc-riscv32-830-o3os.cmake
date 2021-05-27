set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR RISCV32)

set(CMAKE_C_COMPILER_WORKS 1)
set(CMAKE_CXX_COMPILER_WORKS 1)

set(CMAKE_C_COMPILER riscv32-unknown-elf-gcc)
set(CMAKE_CXX_COMPILER riscv32-unknown-elf-g++)

#set(RISCV32_FLAGS "-O3 -Os -v -march=rv32imafc -mabi=ilp32f -mcmodel=medany -std=gnu99 -save-temps")
set(RISCV32_FLAGS "-O3 -Os -v -march=rv32imafc -mabi=ilp32f -save-temps")
set(CMAKE_C_FLAGS "${RISCV32_FLAGS} ${CMAKE_C_FLAGS}" CACHE STRING "" FORCE)
set(CMAKE_CXX_FLAGS "${RISCV32_FLAGS} ${CMAKE_CXX_FLAGS}" CACHE STRING "" FORCE)

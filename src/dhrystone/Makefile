DHRY-LFLAGS =

DHRY-CFLAGS := -O3 -DTIME -DNOENUM -Wno-implicit -save-temps -DHZ=100
DHRY-CFLAGS += -fno-builtin-printf -fno-common -falign-functions=4

#Uncomment below for FPGA run, default DHRY_ITERS is 2000 for RTL
#DHRY-CFLAGS += -DDHRY_ITERS=20000000
#/opt/newoff/bin/riscv64-unknown-elf-gcc
CC=riscv64-unknown-elf-gcc
SRC = dhry_1.c dhry_2.c
HDR = dhry.h

override CFLAGS += $(DHRY-CFLAGS) $(XCFLAGS) -Xlinker --defsym=__stack_size=0x800 -Xlinker --defsym=__heap_size=0x1000 -v
dhrystone: $(SRC) $(HDR)
	$(CC) $(CFLAGS) $(SRC) $(LDFLAGS) $(LOADLIBES) $(LDLIBS) -o $@

clean:
	rm -f *.i *.s *.o dhrystone dhrystone.hex

